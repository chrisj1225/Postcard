import { 
  RECEIVE_POSTCARDS,
  RECEIVE_POSTCARD,
  REMOVE_POSTCARD
} from '../../actions/postcard_actions';
import {
  RECEIVE_TRIPS,
  RECEIVE_TRIP
} from '../../actions/trip_actions';
// import { RECEIVE_USER_LOGOUT } from '../../actions/session_actions';

const PostcardsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POSTCARDS:
      return Object.assign({}, state, action.postcards);
    case RECEIVE_TRIPS:
      return Object.assign({}, state, action.data.postcards);
    case RECEIVE_TRIP:
      return Object.assign({}, state, action.postcards);
    case RECEIVE_POSTCARD:
      return Object.assign({}, state, { [action.postcard._id]: action.postcard })
    case REMOVE_POSTCARD:
      let newState = Object.assign({}, state);
      delete newState[action.postcardId];
      return newState;
    default:
      return state;
  }
}

export default PostcardsReducer;