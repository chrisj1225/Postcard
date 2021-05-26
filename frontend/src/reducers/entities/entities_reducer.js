import { combineReducers } from 'redux';

import TripsReducer from './trips_reducer';

export default combineReducers({
  trips: TripsReducer
});
