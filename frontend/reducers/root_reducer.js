import { combineReducers } from 'redux';
import session from './session/session_reducer';

const RootReducer = combineReducers({
  session
})

export default RootReducer;