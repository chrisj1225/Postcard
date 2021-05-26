import * as PostcardAPIUtil from '../util/postcard_api_util';

export const RECEIVE_POSTCARDS = "RECEIVE_POSTCARDS";
export const RECEIVE_POSTCARD = "RECEIVE_POSTCARD";
export const REMOVE_POSTCARD = "REMOVE_POSTCARD";
export const RECEIVE_POSTCARD_ERRORS = "RECEIVE_POSTCARD_ERRORS";
export const CLEAR_POSTCARD_ERRORS = "CLEAR_POSTCARD_ERRORS";

export const receivePostcards = postcards => {
  return({
    type: RECEIVE_POSTCARDS,
    postcards
  })
}

export const receivePostcard = postcard => {
  return({
    type: RECEIVE_POSTCARD,
    postcard
  })
}

export const removePostcard = postcardId => {
  return({
    type: REMOVE_POSTCARD,
    postcardId
  })
}

export const receivePostcardErrors = errors => {
  return({
    type: RECEIVE_POSTCARD_ERRORS,
    errors
  })
}

export const clearPostcardErrors = () => {
  return({
    type: CLEAR_POSTCARD_ERRORS
  })
}

export const fetchTripPostcards = tripId => dispatch => {
  return PostcardAPIUtil.fetchUserTrips(tripId)
    .then(postcards => dispatch(receivePostcards(postcards)))
    .catch(err => dispatch(receivePostcardErrors(err.response.data)))
}

export const fetchPostcard = postcardId => dispatch => {
  return PostcardAPIUtil.fetchTrip(postcardId)
    .then(postcard => dispatch(receivePostcard(postcard)))
    .catch(err => dispatch(receivePostcardErrors(err.response.data)))
}

export const createPostcard = (tripId, postcard) => dispatch => {
  return PostcardAPIUtil.createPostcard(tripId, postcard)
    .then(postcard => dispatch(receivePostcard(postcard)))
    .catch(err => dispatch(receivePostcardErrors(err.response.data)))
}

export const updatePostcard = (tripId, postcard) => dispatch => {
  return PostcardAPIUtil.updateTrip(tripId, postcard)
    .then(postcard => dispatch(receivePostcard(postcard)))
    .catch(err => dispatch(receivePostcardErrors(err.response.data)))
}

export const deleteTrip = (tripId, postcardId) => dispatch => {
  return PostcardAPIUtil.deletePostcard(tripId, postcardId)
    .then(() => dispatch(removePostcard(postcardId)))
    .catch(err => dispatch(receivePostcardErrors(err.response.data)))
}