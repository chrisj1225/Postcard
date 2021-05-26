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
      return action.trips.data;
    case RECEIVE_TRIP:
      debugger
      return Object.assign({}, state, { [action.trip.data._id]: action.trip.data })
    case REMOVE_TRIP:
      debugger
      let newState = Object.assign({}, state);
      delete newState[action.tripId];
      return newState;
    default:
      return state;
  }
}

export default TripsReducer;