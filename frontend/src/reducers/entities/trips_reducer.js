import { 
  RECEIVE_TRIPS,
  RECEIVE_TRIP,
  REMOVE_TRIP
} from '../../actions/trip_actions';
// import { RECEIVE_USER_LOGOUT } from '../../actions/session_actions';

const TripsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_TRIPS:
      return Object.assign({}, state, action.trips.data.trips);
    case RECEIVE_TRIP:
      return Object.assign({}, state, { [action.trip.data.trip._id]: action.trip.data.trip })
    case REMOVE_TRIP:
      let newState = Object.assign({}, state);
      delete newState[action.trip.data.trip._id];
      return newState;
    default:
      return state;
  }
}

export default TripsReducer;