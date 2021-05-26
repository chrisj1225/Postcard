import axios from 'axios';

export const fetchTripPostcards = (tripId) => {
  return axios.get(`/api/trips/${tripId}/postcards/`);
};

export const fetchPostcard = postcardId => {
  return axios.get(`/api/postcards/${postcardId}}`);
};

export const createPostcard = (tripId, postcard) => {
  return axios.post(`/api/trips/${tripId}/postcards/`, postcard);
};

export const updatePostcard = (tripId, postcard) => {
  return axios.patch(`/api/trips/${tripId}/postcards/${postcard.id}`, postcard);
};

// export const updatePostcardPhotos = (postcardId, photos) => {
//   return axios.put(`/api/postcards/${postcardId}`, photos)
// }

export const deletePostcard = (tripId, postcardId) => {
  return axios.delete(`/api/trips/${tripId}/postcards/${postcardId}`);
};
