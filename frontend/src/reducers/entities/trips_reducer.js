import { RECEIVE_FOLLOWED_TRIPS } from '../../actions/follow_actions';
import { 
  RECEIVE_TRIPS,
  RECEIVE_TRIP,
  REMOVE_TRIP,
  RECEIVE_NEW_TRIP,
} from '../../actions/trip_actions';
// import { RECEIVE_USER_LOGOUT } from '../../actions/session_actions';

const TripsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_TRIPS:
      return Object.assign({}, state, action.data.trips);
    case RECEIVE_TRIP:
      return Object.assign({}, state, { [action.data.trip._id]: action.data.trip })
    case RECEIVE_NEW_TRIP:
      return Object.assign({}, state, { [action.trip._id]: action.trip })
    case REMOVE_TRIP:
      let newState = Object.assign({}, state);
      delete newState[action.tripId];
      return newState;
    case RECEIVE_FOLLOWED_TRIPS:
      return Object.assign({}, action.data.trips)
    default:
      return state;
  }
}

export default TripsReducer;