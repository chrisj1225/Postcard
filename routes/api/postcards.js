const express = require("express");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const AWS = require('aws-sdk');
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const router = express.Router();
const Postcard = require('../../models/Postcard');
const upload = require("../../services/ImageUpload");
const deleteImage = require("../../services/imageDelete")

router.get('/:id', async (req, res) => {
  const postcard = await Postcard.findById(req.params.id);
  const trip = await Trip.findById(postcard.tripId);
  const user = await User.findById(trip.travellerId);
  let thumbnails = postcard.thumbnails || [];
  let postcardObj = {
    photos: postcard.photos,
    thumbnails: thumbnails,
    _id: postcard.id,
    title: postcard.title,
    body: postcard.body,
    tripId: postcard.tripId,
    lat: postcard.lat,
    lng: postcard.lng,
    createdAt: postcard.createdAt,
    updatedAt: postcard.updatedAt,
    __v: postcard.__v,
    travellerId: user.id
  }
  res.json(postcardObj)
})

router.post('/:id/upload', upload.array("images", 8), passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const postcard = await Postcard.findById(req.params.id);

    if(!postcard){

      return res.status(404).json({ postcards: "Postcard not found"})
    }

    const trip = await Trip.findById(postcard.tripId)

    if(!trip){
      return res.status(404).json({trip: "Trip not found"})
    }
    
    const user = await User.findById(req.user.id)

    if(trip.travellerId != user.id){
      return res.status(401).json(
        {
          user: "You do not have permission to upload a photo to this postcard"
        }
      )
    }
    

    if(!req.files){
      res.status(400).json({errors: [{files: "Please upload a file"}]})
      // return res.status(400).json({files: req.files})
    }

    let thumbnails = postcard.thumbnails || [];
    
    const files = req.files;
    let error;
    files.forEach((file) => {
      if(!file.mimetype.startsWith('image')){
        res.status(400).json({errors: [{files: "Please upload a file"}]})
      }

      if(postcard.photos.length < 8){
        postcard.photos = postcard.photos.concat(file.location);
        let thumbnailArray = file.location.split("/");
        let subArr = thumbnailArray[2].split(".");
        subArr[0] = subArr[0].concat("-resized");
        thumbnailArray[2] = subArr.join(".");
        let thumbnailUrl = thumbnailArray.join("/");
        thumbnails = thumbnails.concat(thumbnailUrl);
        postcard.thumbnails = thumbnails;
      } else{
        let key = file.key;
        let bucket = file.bucket;

        deleteImage(bucket, key);
        error = "You cannot have more than 8 images on a single postcard."
      }
      
    });
    
    postcard.save();

    let postcardObj = {
      photos: postcard.photos,
      thumbnails: postcard.thumbnails,
      _id: postcard.id,
      title: postcard.title,
      body: postcard.body,
      tripId: postcard.tripId,
      lat: postcard.lat,
      lng: postcard.lng,
      createdAt: postcard.createdAt,
      updatedAt: postcard.updatedAt,
      __v: postcard.__v,
      travellerId: user.id
    }

    res.json({postcard: postcardObj, error: error});
  } catch(err){
    console.log("hello")
    res.json({error: err})
  }
})

//needs imageUrl
router.put('/:id/deleteImage', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const postcard = await Postcard.findById(req.params.id);
  
  if(!postcard){
    return res.status(404).json({ postcards: "Postcard not found"})
  }

  const trip = await Trip.findById(postcard.tripId)

  if(!trip){
    return res.status(404).json({trip: "Trip not found"})
  }

  const user = await User.findById(req.user.id)

  if(trip.travellerId != user.id){
    return res.status(401).json(
      {
        user: "You do not have permission to delete a photo from this postcard"
      }
    )
  }

  // if(req.body){
  //   return res.json({res: req.body.imageUrl})
  // }
  let bucket = req.body.imageUrl.split("/")[2].split(".")[0];
  let key = req.body.imageUrl.split("/")[3];
  let thumbnailBucket = bucket + "-resized";
  // if(bucket && key){
  //   return res.json({bucket: bucket, key: key})
  // }

  let thumbnailArray = req.body.imageUrl.split("/");
  let subArr = thumbnailArray[2].split(".");
  subArr[0] = subArr[0].concat("-resized");
  thumbnailArray[2] = subArr.join(".");
  let thumbnailUrl = thumbnailArray.join("/");

  deleteImage(bucket, key);
  deleteImage(thumbnailBucket, key);

  let idx = postcard.photos.indexOf(req.body.imageUrl)
  postcard.photos.splice(idx, 1);

  let thumbnails = postcard.thumbnails;
  if(postcard.thumbnails){
    let idx2 = postcard.thumbnails.indexOf(thumbnailUrl)
    postcard.thumbnails.splice(idx2, 1);
  } else {
    thumbnails = []
  }
  postcard.save()
    .then((postcard) => {
      let postcardObj = {
        photos: postcard.photos,
        thumbnails: thumbnails,
        _id: postcard.id,
        title: postcard.title,
        body: postcard.body,
        tripId: postcard.tripId,
        lat: postcard.lat,
        lng: postcard.lng,
        createdAt: postcard.createdAt,
        updatedAt: postcard.updatedAt,
        __v: postcard.__v,
        travellerId: user.id
      }
      res.json(postcardObj)
    })
})



//filename.split("/")[2].split(".")[0]

module.exports = router;