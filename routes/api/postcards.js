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

router.get('/:id', (req, res) => {
  Postcard.findById(req.params.id)
    .then((postcard) => res.json(postcard))
    .catch((err) => res.status(400).json({ postcard: "No postcard found with that ID"}))
})

router.put('/:id/upload', upload.array("images", 8), passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const postcard = await Postcard.findById(req.params.id);

    if(!postcard){

      return res.status(404).json({ postcards: "Postcard not found"})
    }

    const trip = await Trip.findById(postcard.tripId)

    if(!trip){
      return res.status(404).json({trip: "Trip not found"})
    }
    
    if(trip.travellerId != req.user.id){
      return res.status(401).json(
        {
          user: "You do not have permission to upload a photo to this postcard"
        }
      )
    }
    

    if(!req.files){
      res.status(400).json({errors: [{files: "Please upload a file"}]})

    }


    const files = req.files;
    
    files.forEach((file) => {
      if (!file.mimetype.startsWith('image')){
        res.status(400).json({errors: [{files: "Please upload a file"}]})
      }
      
      postcard.photos = postcard.photos.concat(file.location);
      postcard.save();
    });

    res.json(postcard);
  } catch(err){
    console.log("hello")
    res.json({error: err})
  }
})

//needs imageUrl
router.delete('/:id/deleteImage', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const postcard = await Postcard.findById(req.params.id);

  if(!postcard){
    return res.status(404).json({ postcards: "Postcard not found"})
  }

  const trip = await Trip.findById(postcard.tripId)

  if(!trip){
    return res.status(404).json({trip: "Trip not found"})
  }

  if(trip.travellerId != req.user.id){
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
  // if(bucket && key){
  //   return res.json({bucket: bucket, key: key})
  // }

  deleteImage(bucket, key);

  let idx = postcard.photos.indexOf(req.body.imageUrl)
  postcard.photos.splice(idx, 1);
  postcard.save()
    .then((postcard) => {
      res.json(postcard)
    })
})



//filename.split("/")[2].split(".")[0]

module.exports = router;