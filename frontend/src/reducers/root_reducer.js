import { combineReducers } from 'redux';
import session from './session/session_reducer';
import errors from './errors/errors_reducer';
import ui from './ui/ui_reducer';

const RootReducer = combineReducers({
  session,
  errors,
  ui,
})

export default RootReducer;