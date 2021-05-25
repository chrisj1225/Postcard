const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTripsInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : "";
  data.description = validText(data.description) ? data.description : "";

  if(!Validator.isLength(data.title, {min: 1, max: 30})){
    errors.title = "Title must be between 1 and 30 characters"
  }

  if(Validator.isEmpty(data.title)){
    errors.title = "Title field is required"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}