import * as SessionAPIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
// export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

// export const receiveUserSignIn = () => ({
//   type: RECEIVE_USER_SIGN_IN
// });

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
})

// export const signup = user => dispatch => {
//   return SessionAPIUtil.signup(user)
//     .then(() => dispatch(receiveUserSignIn()),
//     err => dispatch(receiveSessionErrors(err.response.data))
//     )
// };

export const signup = user => dispatch => {
  return SessionAPIUtil.signup(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('currentUser', JSON.stringify(res.data.user))
      SessionAPIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(res.data.user));
    })
    .catch(err => {
      dispatch(receiveSessionErrors(err.response.data));
    })
}

export const login = user => dispatch => {
  return SessionAPIUtil.login(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('currentUser', JSON.stringify(res.data.user))
      SessionAPIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(res.data.user));
    })
    .catch(err => {
      dispatch(receiveSessionErrors(err.response.data));
    })
}

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('currentUser');
  SessionAPIUtil.setAuthToken(false);
  dispatch(logoutUser());
};