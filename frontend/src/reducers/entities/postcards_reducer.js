import { RECEIVE_FOLLOWED_TRIPS } from '../../actions/follow_actions';
import { 
  RECEIVE_POSTCARDS,
  RECEIVE_POSTCARD,
  REMOVE_POSTCARD
} from '../../actions/postcard_actions';
import {
  RECEIVE_TRIPS,
  RECEIVE_TRIP,
  RECEIVE_USER_TRIPS
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
      return action.data.postcards;
    case RECEIVE_POSTCARD:
      return Object.assign({}, state, { [action.postcard._id]: action.postcard })
    case REMOVE_POSTCARD:
      let newState = Object.assign({}, state);
      delete newState[action.postcardId];
      return newState;
    case RECEIVE_FOLLOWED_TRIPS:
        return Object.assign({}, action.data.postcards)
    case RECEIVE_USER_TRIPS:
        return Object.assign({}, action.data.postcards)
    default:
      return state;
  }
}

export default PostcardsReducer;