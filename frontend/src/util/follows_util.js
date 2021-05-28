import axios from 'axios';

export const fetchFollowedUsers = () => {
  return axios.get('/api/users/follows')
}

export const createFollow = (userId) => {
  return axios.post(`/api/users/${userId}/follow`)
};

export const deleteFollow = (userId) => {
  return axios.delete(`/api/users/${userId}/unfollow`)
}

export const fetchFollowedTrips = () => {
  return axios.get('/api/trips/follows')
}
