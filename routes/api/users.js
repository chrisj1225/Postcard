const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();
const User = require('../../models/User');
const tripRouter = express.Router({mergeParams: true});
const Trip = require('../../models/Trip');

router.use('/:userId/trips', tripRouter)

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    displayName: req.user.displayName,
    email: req.user.email
  });
})

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if(user){
        errors.email = 'Email already registered';
        return res.status(400).json(errors);
      } else{
        const newUser = new User({
          displayName: req.body.displayName,
          email: req.body.email,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => {
                const payload = {id: user.id, displayName: user.displayName}
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  {expiresIn: 86400},
                  (err, token) => {
                    res.json({
                      user,
                      success: true,
                      token: 'Bearer ' + token
                    });
                  }
                );
              })
              .catch(err => console.log(err));
          })
        })
        
      }
    })
})


router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then((user) => {
      if (!user){
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if(isMatch){
            const payload = {id: user.id, displayName: user.displayName}
            jwt.sign(
              payload,
              keys.secretOrKey,
              {expiresIn: 86400},
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else{
            errors.password = 'Incorrect password'
            return res.status(400).json(errors);
          }
        })
    })
})

tripRouter.get('/', (req, res) => {
  Trip.find({travellerId: req.params.userId})
    .sort({date: -1})
    .then((trips) => {
      const tripsObj = {}
      trips.forEach((trip) => {
        tripsObj[trip.id] = trip
      })
      return res.json(tripsObj)
    })
    .catch((err) => res.status(400).json({ trip: "no trips found" }))
})


module.exports = router;