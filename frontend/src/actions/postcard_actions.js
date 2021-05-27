import * as PostcardAPIUtil from '../util/postcard_util';

export const RECEIVE_POSTCARDS = "RECEIVE_POSTCARDS";
export const RECEIVE_POSTCARD = "RECEIVE_POSTCARD";
export const REMOVE_POSTCARD = "REMOVE_POSTCARD";
export const RECEIVE_POSTCARD_ERRORS = "RECEIVE_POSTCARD_ERRORS";
export const CLEAR_POSTCARD_ERRORS = "CLEAR_POSTCARD_ERRORS";

export const receivePostcards = data => {
  return({
    type: RECEIVE_POSTCARDS,
    postcards: data.postcards,
  })
}

export const receivePostcard = postcard => {
  return({
    type: RECEIVE_POSTCARD,
    postcard,
  })
}

export const removePostcard = postcard => {
  return({
    type: REMOVE_POSTCARD,
    postcardId: postcard.id,
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

// export const fetchAllPostcards = () => dispatch => 

export const fetchTripPostcards = tripId => dispatch => {
  return PostcardAPIUtil.fetchTripPostcards(tripId)
    .then(res => dispatch(receivePostcards(res.data)))
    .catch(err => dispatch(receivePostcardErrors(err.response.data)))
}

export const fetchPostcard = postcardId => dispatch => {
  return PostcardAPIUtil.fetchPostcard(postcardId)
    .then(res => dispatch(receivePostcard(res.data)))
    .catch(err => dispatch(receivePostcardErrors(err.response.data)))
}

export const createPostcard = (tripId, postcard) => dispatch => {
  return PostcardAPIUtil.createPostcard(tripId, postcard)
    .then(res => dispatch(receivePostcard(res.data)))
    .catch(err => dispatch(receivePostcardErrors(err.response.data)))
}

export const updatePostcard = (tripId, postcard) => dispatch => {
  return PostcardAPIUtil.updatePostcard(tripId, postcard)
    .then(res => dispatch(receivePostcard(res.data)))
    .catch(err => dispatch(receivePostcardErrors(err.response.data)))
}

export const updatePostcardPhotos = (postcardId, photos) => dispatch => {
  return PostcardAPIUtil.updatePostcardPhotos(postcardId, photos)
    .then(res => {
      debugger
      return dispatch(receivePostcard(res.postcard))
    })
    .catch(err => dispatch(receivePostcardErrors(err.response.data)))
} 

export const deleteTrip = (tripId, postcardId) => dispatch => {
  return PostcardAPIUtil.deletePostcard(tripId, postcardId)
    .then((res) => dispatch(removePostcard(res.data)))
    .catch(err => dispatch(receivePostcardErrors(err.response.data)))
}