const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const keys = require('../config/keys');
const s3 = new AWS.S3({
  accessKeyId: keys.AWS.accessKeyId,
  secretAccessKey: keys.AWS.secretAccessKey,
});
const path = require('path')



const deleteImage = (bucket, key) => {

  let params = {
    Bucket: bucket,
    Key: key,
  }
  s3.deleteObject(params, (err, data) => {
    if(err){
      console.log(err)
    }
  });

}

module.exports = deleteImage;