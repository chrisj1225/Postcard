const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  travellerId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  description: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = Trip = mongoose.model('Trip', TripSchema);