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
const upload = require("../../services/ImageUpload");
const deleteImage = require("../../services/imageDelete")

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

router.put('/:userId/follow', passport.authenticate('jwt', {session: false}), async (req, res) => {
  //takes the userId of the user you want to follow
  const user = await User.findById(req.user.id);
  const followedUser = await User.findById(req.params.userId);
  if(user.following.includes(followedUser.id)){
    return res.status(400).json("Already following that user")
  }


  user.following = user.following.concat(req.params.userId);
  user.save()
    .then((user) => {
      res.json(user)
    })
})

router.delete('/:userId/unfollow', passport.authenticate('jwt', {session: false}), async (req, res)=>{
  const user = await User.findById(req.user.id);
  const followedUser = await User.findById(req.params.userId);
  if(!user.following.includes(followedUser.id)){
    return res.status(400).json("Not yet following that user")
  }
  let idx = user.following.indexOf(followedUser.id)
  user.following.splice(idx, 1)
  user.save()
    .then((user)=>{
      res.json(user)
    })
})

router.post("/upload", upload.single("image"), passport.authenticate('jwt', {session: false}), async (req, res) => {
  const currentUser = await User.findById(req.user.id);
  currentUser.profilePic = req.file.location
  currentUser.save()
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

router.get('/follows', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const currentUser = await User.findById(req.user.id);
  let followedUsers = {}
  for(let i = 0; i < currentUser.following.length; i++){
    let followId = currentUser.following[i];
    let followUser = await User.findById(followId);
    followedUsers[followId] = followUser;
  }
  // currentUser.following.forEach(follow=>{
  //   followedUsers[follow.id] = follow
  // })
  res.json({followedUsers: followedUsers})
})



module.exports = router;