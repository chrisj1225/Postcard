import * as TripAPIUtil from '../util/trip_api_util';

export const RECEIVE_TRIPS = "RECEIVE_TRIPS";
export const RECEIVE_TRIP = "RECEIVE_TRIP";
export const REMOVE_TRIP = "REMOVE_TRIP";
export const RECEIVE_TRIP_ERRORS = "RECEIVE_TRIP_ERRORS";
export const CLEAR_TRIP_ERRORS = "CLEAR_TRIP_ERRORS";
export const RECEIVE_NEW_TRIP = "RECEIVE_NEW_TRIP";

export const receiveTrips = data => {
  return({
    type: RECEIVE_TRIPS,
    data
  })
}

export const receiveTrip = data => {
  return({
    type: RECEIVE_TRIP,
    trip: data.trip,
  })
}

export const removeTrip = data => {
  return({
    type: REMOVE_TRIP,
    tripId: data.trip.id,
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

export const receiveNewTrip = data => {
  return({
    type: RECEIVE_NEW_TRIP,
    trip: data.trip,
  });
}

export const fetchAllTrips = () => dispatch => {
  return TripAPIUtil.fetchAllTrips()
    .then(res => dispatch(receiveTrips(res.data)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export const fetchUserTrips = userId => dispatch => {
  return TripAPIUtil.fetchUserTrips(userId)
    .then(res => dispatch(receiveTrips(res.data)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export const fetchTrip = tripId => dispatch => {
  return TripAPIUtil.fetchTrip(tripId)
    .then(res => dispatch(receiveTrip(res.data)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export const createTrip = trip => dispatch => {
  return TripAPIUtil.createTrip(trip)
    .then(res => {
      return dispatch(receiveNewTrip(res.data));
    })
    .catch(err => {
      return dispatch(receiveTripErrors(err.response.data));
    })
}

export const updateTrip = trip => dispatch => {
  return TripAPIUtil.updateTrip(trip)
    .then(res => dispatch(receiveTrip(res.data)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export const deleteTrip = tripId => dispatch => {
  return TripAPIUtil.deleteTrip(tripId)
    .then(res => dispatch(removeTrip(res.data)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}