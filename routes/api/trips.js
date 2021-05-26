const express = require("express");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateTripsInput = require("../../validation/trips")
const validPostcardsInput = require("../../validation/postcards")

const router = express.Router();
const Trip = require("../../models/Trip")
const postcardRouter = express.Router({mergeParams: true});
const Postcard = require('../../models/Postcard');

router.use('/:tripId/postcards', postcardRouter)

router.get("/", (req, res) => {
  Trip.find()
    .sort({date: -1})
    .then((trips) => {
      const tripsObj = {}
      const pcObj = {}
      trips.forEach((trip) => {
        tripsObj[trip.id] = trip
        Postcard.find({tripId: trip.id})
          .sort({date: -1})
          .then((postcards) => {
            postcards.forEach(postcard => {
              pcObj[postcard.id] = postcard
            })
          })
      })
      return res.json({trips: tripsObj, postcards: pcObj})
    })
    .catch((err) => res.status(400).json({ trips: "no trips found" }))
})

router.get("/:id", (req, res) => {
  Trip.findById(req.params.id)
    .then((trip) => {
      const pcObj = {}
      Postcard.find({tripId: trip.id})
          .sort({date: -1})
          .then((postcards) => {
            postcards.forEach(postcard => {
              pcObj[postcard.id] = postcard
            })
          })
      res.json({trip: trip, postcards: pcObj})
    })
    .catch((err) => res.status(400).json({ trips: "No Trip found with that ID"}))
})

router.post("/", passport.authenticate('jwt', {session: false}), (req, res) => {

  const {errors, isValid} = validateTripsInput(req.body);

  if (!isValid){
    return res.status(400).json(errors);
  }

  const newTrip = new Trip({
    title: req.body.title,
    description: req.body.description || "",
    travellerId: req.user.id
  })

  newTrip.save()
    .then((trip) => res.json(trip))
    .catch((err) => res.json(err))
})

router.patch("/:id", passport.authenticate('jwt', {session: false}), (req, res) => {

  const {errors, isValid} = validateTripsInput(req.body);

  if (!isValid){
    return res.status(400).json(errors);
  }

  Trip.findById(req.params.id)
    .then((trip) => {
      if(!trip){
        errors.trip = "Trip not found";
        return res.status(400).json(errors)
      } else if(trip.travellerId != req.user.id){
        errors.user = "You do not have permission to edit this trip";
        //Change error code probably
        return res.status(400).json(errors)
      } else{
        trip.title = req.body.title;
        trip.description = req.body.description;
        trip.save()
          .then((trip) => res.json(trip))
      }
    }) 
})

router.delete("/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
  Trip.findById(req.params.id)
    .then((trip) => {
      if(!trip){
        return res.status(400).json({trip: "Trip not found"})
      } else if(trip.travellerId != req.user.id){
        return res.status(400).json({user: "You do not have permission to delete this trip"});
      } else{
        trip.delete()
        .then((trip) => res.json(trip))
      }
    })
})

postcardRouter.get('/', (req, res) => {
  Postcard.find({tripId: req.params.tripId})
    .sort({date: -1})
    .then((postcards) => {
      const pcObj = {}
      postcards.forEach((postcard) => {
        pcObj[postcard.id] = postcard
      })
      return res.json(pcObj)
    })
    .catch((err) => res.status(400).json({ postcard: "no postcards found" }))
})

postcardRouter.get('/:id', (req, res) => {
  Postcard.findById(req.params.id)
    .then((postcard) => res.json(postcard))
    .catch((err) => res.status(400).json({ postcard: "No postcard found with that ID"}))
})

postcardRouter.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validPostcardsInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }

  Trip.findById(req.params.tripId)
    .then((trip) => {
      if (trip.travellerId == req.user.id){
        const newPostcard = new Postcard({
          title: req.body.title,
          body: req.body.body,
          tripId: req.params.tripId,
          lat: req.body.lat,
          lng: req.body.lng,
          photos: req.body.photos || []
        })
        newPostcard.save()
          .then((postcard) => res.json(postcard))
          .catch((err) => res.json(err))
      } else{
        return res.status(400).json({user: `You don't have permission to do that because you are ${req.user.id} and you need to be ${trip.travellerId}`})
      }
    })
})

postcardRouter.patch('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validPostcardsInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }

  Trip.findById(req.params.tripId)
    .then((trip) => {
      if (trip.travellerId == req.user.id){
        Postcard.findById(req.params.id)
          .then((postcard) => {
            if(!postcard){
              errors.postcard = "Postcard not found";
              return res.status(400).json(errors)
            } else{
              postcard.title = req.body.title;
              postcard.body = req.body.body;
              postcard.lat = req.body.lat;
              postcard.lng = req.body.lng;
              postcard.photos = req.body.photos || [];
              postcard.save()
                .then((postcard) => res.json(postcard))
            }
          })
      } else {
        return res.status(400).json({user: `You don't have permission to do that`})
      }
    })
})

postcardRouter.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Trip.findById(req.params.tripId)
    .then((trip) => {
      if (trip.travellerId == req.user.id){
        Postcard.findById(req.params.id)
          .then((postcard) => {
            if(!postcard){
              return res.status(400).json({postcard: "Postcard not found"})
            } else{
              postcard.delete()
                .then((postcard) => res.json(postcard))
            }
          })
      } else{
        return res.status(400).json({user: `You don't have permission to do that`})
      }
    })
})


module.exports = router;