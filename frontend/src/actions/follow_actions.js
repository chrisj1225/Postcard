import * as FollowsUtil from '../util/follows_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_FOLLOWED_TRIPS = "RECEIVE_FOLLOWED_TRIPS"

const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

const receiveFollowedTrips = data => ({
  type: RECEIVE_FOLLOWED_TRIPS,
  data: data
})

export const createFollow = userId => dispatch => {
  return FollowsUtil.createFollow(userId)
    .then(user => {
      return dispatch(receiveCurrentUser(user))
    })
}

export const deleteFollow = userId => dispatch => {
  return FollowsUtil.deleteFollow(userId)
    .then(user => {
      return dispatch(receiveCurrentUser(user))
    })
}

export const fetchFollowedTrips = () => dispatch => {
  return FollowsUtil.fetchFollowedTrips()
    .then(data => {
      return dispatch(receiveFollowedTrips(data))
    })
}
