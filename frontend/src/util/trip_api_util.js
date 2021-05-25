import axios from 'axios';

export const fetchAllTrips = () => {
  return axios.get('/api/trips/');
};

export const fetchUserTrips = userId => {
  return axios.get(`/api/users/${userId}/trips`);
};

export const fetchTrip = tripId => {
  return axios.get(`/api/trips/${tripId}`);
};

export const createTrip = trip => {
  return axios.post('/api/trips/', trip);
};

export const updateTrip = trip => {
  return axios.patch(`/api/trips/${trip.id}`, trip);
}

export const deleteTrip = tripId => {
  return axios.delete(`/api/trips/${tripId}`);
}
