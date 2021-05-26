const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostcardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tripId: {
    type: Schema.Types.ObjectId,
    ref: "trips"
  },
  lat: {
    type: mongoose.Decimal128,
    required: true
  },
  lng: {
    type: mongoose.Decimal128,
    required: true
  },
  photos: {
    type: Array
  }
}, {
  timestamps: true
})

module.exports = Postcard = mongoose.model('Postcard', PostcardSchema)