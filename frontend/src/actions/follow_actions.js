import * as FollowsUtil from '../util/follows_util';

export const RECEIVE_USER = "RECEIVE_USER";
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
      return dispatch(receiveUser(user.data))
    })
}

export const deleteFollow = userId => dispatch => {
  return FollowsUtil.deleteFollow(userId)
    .then(user => {
      return dispatch(receiveUser(user.data))
    })
}

export const fetchFollowedTrips = () => dispatch => {
  return FollowsUtil.fetchFollowedTrips()
    .then(data => {
      return dispatch(receiveFollowedTrips(data))
    })
}
