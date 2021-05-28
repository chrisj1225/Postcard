import axios from 'axios';

export const fetchTripPostcards = (tripId) => {
  return axios.get(`/api/trips/${tripId}/postcards/`);
};

export const fetchPostcard = postcardId => {
  return axios.get(`/api/postcards/${postcardId}`);
};

export const createPostcard = (tripId, postcard) => {
  return axios.post(`/api/trips/${tripId}/postcards/`, postcard);
};

export const updatePostcard = (tripId, postcard) => {
  return axios.patch(`/api/trips/${tripId}/postcards/${postcard.id}`, postcard);
};

export const updatePostcardPhotos = (postcardId, photos) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  return axios.post(`/api/postcards/${postcardId}/upload`, photos, config)
}

export const deletePostcardPhoto = (postcardId, imageUrl) => {
  return axios.put(`/api/postcards/${postcardId}/deleteImage`, imageUrl); 
}

export const deletePostcard = (tripId, postcardId) => {
  return axios.delete(`/api/trips/${tripId}/postcards/${postcardId}`);
};
