module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  googleMapsAPIKey: process.env.GOOGLE_MAPS_API_KEY,
  AWS: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
    bucket: process.env.BUCKET
  }
}