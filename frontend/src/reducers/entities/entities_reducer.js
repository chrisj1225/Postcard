import { combineReducers } from 'redux';

import TripsReducer from './trips_reducer';
import PostcardsReducer from './postcards_reducer';
// import UsersReducer from './users_reducer';

export default combineReducers({
  trips: TripsReducer,
  postcards: PostcardsReducer,
  // users: UsersReducer
});
