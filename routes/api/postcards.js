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
          // error: `You are ${req.user.id} and this post belongs to ${trip.travellerId}`
        }
      )
    }
    

    if(!req.files){
      res.status(400).json({errors: [{files: "Please upload a file"}]})
      // console.log("hello")
      // res.status(400).json({req: req.body})
    }

    // if(req.files){
    //   // res.status(400).json({errors: [{files: "Please upload a file"}]})
    //   // console.log("hello")
    //   res.status(400).json({req: req.files})
    // }
    
    // const S3_BUCKET = keys.AWS.dev.bucket;
    // const AWS_ACCESS_KEY_ID = keys.AWS.accessKeyId;
    // const AWS_SECRET_ACCESS_KEY = keys.AWS.secretAccessKey;
    // const s3 = new AWS.S3();
    
    // AWS.config.update({
    //   accessKeyId: AWS_ACCESS_KEY_ID,
    //   secretAccessKey: AWS_SECRET_ACCESS_KEY
    // })
    
    
    const files = req.files;
    
    files.forEach((file) => {
      if (!file.mimetype.startsWith('image')){
        res.status(400).json({errors: [{files: "Please upload a file"}]})
      }
      // if(file){
      //   res.status(400).json({req: file.location})
      // }

      // file.name = `photo_${postcard._id}${path.parse(file.originalname).ext}`
      
      // let Blob = file.data;
      
      // let params = {
      //   Bucket: S3_BUCKET,
      //   Key: file.name,
      //   Body: file,
      // }

      // if(file){
      //   res.status(400).json({req: params})
      // }
      
      // s3.upload(params, function(err, data){
      //   console.log(err, data);
      // });

      postcard.photos = postcard.photos.concat(file.location);
      postcard.save();
    });

    res.json(postcard);
  } catch(err){
    console.log("hello")
    res.json({error: err})
  }
})

// router.post("/:id/photos", passport.authenticate('jwt', {session: false}), upload.array("images", 8), (req, res) => {
  

// })

module.exports = router;