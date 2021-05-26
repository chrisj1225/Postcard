import { combineReducers } from 'redux';

import TripsReducer from './trips_reducer';
import PostcardsReducer from './postcards_reducer';

export default combineReducers({
  trips: TripsReducer,
  postcards: PostcardsReducer
});
