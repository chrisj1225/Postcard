import { 
  RECEIVE_CURRENT_USER,
  // RECEIVE_USER_SIGN_IN,
  RECEIVE_USER_LOGOUT
} from '../../actions/session_actions';

import { 
  RECEIVE_USER,
} from '../../actions/follow_actions';;

const initialState = {
  isAuthenticated: false,
  user: {}
}

const SessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case RECEIVE_USER:
      return {
        ...state,
        user: action.user
      };
    // case RECEIVE_USER_SIGN_IN:
    //   return {
    //     ...state,
    //     isSignedIn: true
    //   }
    case RECEIVE_USER_LOGOUT: 
      return {
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
}

export default SessionReducer;