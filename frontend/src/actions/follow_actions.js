import * as FollowsUtil from '../util/follows_util';

export const RECEIVE_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_FOLLOWED_TRIPS = "RECEIVE_FOLLOWED_TRIPS"

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveFollowedTrips = data => ({
  type: RECEIVE_FOLLOWED_TRIPS,
  data: data
})

export const createFollow = userId => dispatch => {
  return FollowsUtil.createFollow(userId)
    .then(user => {
      debugger
      return dispatch(receiveUser(user))
    })
}

export const deleteFollow = userId => dispatch => {
  return FollowsUtil.deleteFollow(userId)
    .then(user => {
      debugger
      return dispatch(receiveUser(user))
    })
}

export const fetchFollowedTrips = () => dispatch => {
  return FollowsUtil.fetchFollowedTrips()
    .then(data => {
      return dispatch(receiveFollowedTrips(data))
    })
}
