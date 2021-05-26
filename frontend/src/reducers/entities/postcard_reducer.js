import { 
  RECEIVE_POSTCARDS,
  RECEIVE_POSTCARD,
  REMOVE_POSTCARD
} from '../../actions/postcard_actions';
// import { RECEIVE_USER_LOGOUT } from '../../actions/session_actions';

const PostcardsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POSTCARDS:
      return action.postcards.data;
    case RECEIVE_POSTCARD:
      debugger
      return Object.assign({}, state, { [action.postcard.data._id]: action.postcard.data })
    case REMOVE_POSTCARD:
      debugger
      let newState = Object.assign({}, state);
      delete newState[action.postcardId];
      return newState;
    default:
      return state;
  }
}

export default PostcardsReducer;