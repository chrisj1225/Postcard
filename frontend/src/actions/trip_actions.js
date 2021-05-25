import * as TripAPIUtil from '../util/trip_api_util';

export const RECEIVE_TRIPS = "RECEIVE_TRIPS";
export const RECEIVE_TRIP = "RECEIVE_TRIP";
export const REMOVE_TRIP = "REMOVE_TRIP";
export const RECEIVE_TRIP_ERRORS = "RECEIVE_TRIP_ERRORS";
export const CLEAR_TRIP_ERRORS = "CLEAR_TRIP_ERRORS";

export const receiveTrips = trips => {
  return({
    type: RECEIVE_TRIPS,
    trips
  })
}

export const receiveTrip = trip => {
  return({
    type: RECEIVE_TRIP,
    trip
  })
}

export const removeTrip = tripId => {
  return({
    type: REMOVE_TRIP,
    tripId
  })
}

export const receiveTripErrors = errors => {
  return({
    type: RECEIVE_TRIP_ERRORS,
    errors
  })
}

export const clearTripErrors = () => {
  return({
    type: CLEAR_TRIP_ERRORS
  })
}

export const fetchAllTrips = () => dispatch => {
  return TripAPIUtil.fetchAllTrips()
    .then(trips => dispatch(receiveTrips(trips)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export const fetchUserTrips = userId => dispatch => {
  return TripAPIUtil.fetchUserTrips(userId)
    .then(trips => dispatch(receiveTrips(trips)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export const fetchTrip = tripId => dispatch => {
  return TripAPIUtil.fetchTrip(tripId)
    .then(trip => dispatch(receiveTrip(trip)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export const createTrip = trip => dispatch => {
  return TripAPIUtil.createTrip(trip)
    .then(trip => dispatch(receiveTrip(trip)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export const updateTrip = trip => dispatch => {
  return TripAPIUtil.updateTrip(trip)
    .then(trip => dispatch(receiveTrip(trip)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export const deleteTrip = tripId => dispatch => {
  return TripAPIUtil.deleteTrip(tripId)
    .then(() => dispatch(removeTrip(tripId)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}