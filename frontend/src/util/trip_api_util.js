import axios from 'axios';

export const fetchTrips = userId => {
  return axios.get(`/api/users/${userId}/trips`);
};

export const fetchTrip = tripId => {
  return axios.get(`/api/trips/${tripId}`);
};

export const createTrip = tripId => {
  return axios.post(`/api/trips/${tripId}`);
};

export const updateTrip = trip => {
  return axios.patch(`/api/trips/${trip.id}`);
}
