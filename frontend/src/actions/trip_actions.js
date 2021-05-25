import * as TripAPIUtil from '../util/trip_api_util';

export const RECEIVE_TRIPS = "RECEIVE_TRIPS";
export const RECEIVE_TRIP = "RECEIVE_TRIP";
export const REMOVE_TRIP = "REMOVE_TRIP";
export const RECEIVE_TRIP_ERRORS = "RECEIVE_TRIP_ERRORS";

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

export default fetchAllTrips = () => dispatch => {
  return TripAPIUtil.fetchAllTrips()
    .then(trips => dispatch(receiveTrips(trips)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export default fetchUserTrips = userId => dispatch => {
  return TripAPIUtil.fetchUserTrips(userId)
    .then(trips => dispatch(receiveTrips(trips)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export default fetchTrip = tripId => dispatch => {
  return TripAPIUtil.fetchTrip(tripId)
    .then(trip => dispatch(receiveTrip(trip)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export default createTrip = trip => dispatch => {
  return TripAPIUtil.createTrip(trip)
    .then(trip => dispatch(receiveTrip(trip)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export default updateTrip = trip => dispatch => {
  return TripAPIUtil.updateTrip(trip)
    .then(trip => dispatch(receiveTrip(trip)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}

export default deleteTrip = tripId => dispatch => {
  return TripAPIUtil.deleteTrip(tripId)
    .then(() => dispatch(removeTrip(tripId)))
    .catch(err => dispatch(receiveTripErrors(err.response.data)))
}