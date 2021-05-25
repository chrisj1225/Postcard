const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const Trip = require("../../models/Trip")
const validateTripsInput = require("../../validation/trips")

router.get("/", (req, res) => {
  Trip.find()
    .sort({date: -1})
    .then((trips) => {
      const tripsObj = {}
      trips.forEach((trip) => {
        tripsObj[trip.id] = trip
      })
      return res.json(tripsObj)
    })
    .catch((err) => res.status(400).json({ noTripsFound: "no trips found" }))
})

router.get("/:id", (req, res) => {
  Trip.findById(req.params.id)
    .then((trip) => res.json(trip))
    .catch((err) => res.status(400).json({ noTripFound: "No Trip found with that ID"}))
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

module.exports = router;