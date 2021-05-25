const Validator = require('validator');
const validText = require('./valid-text');
const validCoordinate = require('./valid-coordinate');

module.exports = function validPostcardsInput(data) {
  let errors = {};
  
  data.title = validText(data.title) ? data.title : "";
  data.body = validText(data.body) ? data.body : "";
  
  if(!validCoordinate(data.longitude, "long")){
    errors.longitude = "Longitude value is invalid"
  }
  if(!validCoordinate(data.latitude, "lat")){
    errors.latitude = "Latitude value is invalid"
  }

  if(!Validator.isLength(data.title, {min: 1, max: 30})){
    errors.title = "Title must be between 1 and 30 characters"
  }

  if(!Validator.isLength(data.body, {min: 1, max: 560})){
    errors.title = "Title must be between 1 and 30 characters"
  }

  if(Validator.isEmpty(data.title)){
    errors.title = "Title field is required"
  }

  if(Validator.isEmpty(data.body)){
    errors.body = "Body field is required"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}