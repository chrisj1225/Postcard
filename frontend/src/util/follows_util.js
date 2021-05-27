import axios from 'axios';

export const fetchFollowedUsers = () => {
  return axios.get('/users/follows')
}

export const createFollow = (userId) => {
  return axios.post(`/users/${userId}/follow`)
};

export const deleteFollow = (userId) => {
  return axios.delete(`/users/${userId}/unfollow`)
}

export const fetchFollowedTrips = () => {
  return axios.get('/trips/follows')
}
