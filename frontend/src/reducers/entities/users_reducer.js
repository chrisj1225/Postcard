import { 
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT
} from '../../actions/session_actions';

import { RECEIVE_USER } from '../../actions/follow_actions';

const UsersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, {[action.currentUser._id]: action.currentUser})
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {[action.currentUser._id]: action.currentUser})
    // case RECEIVE_USER_LOGOUT: 
    //   return {}
    default:
      return state;
  }
}

export default UsersReducer;