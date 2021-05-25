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
  latitude: {
    type: mongoose.Decimal128,
    required: true
  },
  longitude: {
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