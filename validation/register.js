const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validRegisterInput(data){
  let errors = {};

  data.displayName = validText(data.displayName) ? data.displayName : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.password2) ? data.password2 : "";

  if(!Validator.isLength(data.displayName, { min: 1, max: 26 })){
    errors.displayName = 'Display Name must be between 1 and 26 characters';
  }
  if(!Validator.isLength(data.password, { min: 8, max: 30 })){
    errors.password = 'Password must be at least 8 characters';
  }
  if(!Validator.isEmail(data.email)){
    errors.email = "Email is invalid"
  }
  if(Validator.isEmpty(data.displayName)){
    errors.displayName = 'Display Name field is required'
  }
  if(Validator.isEmpty(data.email)){
    errors.email = 'Email field is required'
  }
  if(Validator.isEmpty(data.password)){
    errors.password = 'Password field is required'
  }
  if(Validator.isEmpty(data.password2)){
    errors.password2 = 'Confirm Password field is required';
  }
  if(!Validator.equals(data.password, data.password2)){
    errors.password2 = 'Passwords must match';
  }
  return{
    errors,
    isValid: Object.keys(errors).length === 0
  };
};