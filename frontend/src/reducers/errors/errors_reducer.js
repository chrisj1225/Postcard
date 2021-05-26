import { combineReducers } from 'redux';

import TripErrorsReducer from './trip_errors_reducer';
import SessionErrorsReducer from './session_errors_reducer';

export default combineReducers({
  trips: TripErrorsReducer,
  session: SessionErrorsReducer
});