import {connect} from 'react-redux';
import { fetchTrip } from '../../actions/trip_actions'; 
// import { fetchTripPostcards } from '../../actions/postcard_actions';				//actions
import TripShow from './trip_show';				//display component

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.session.user, 
    tripId: ownProps.match.params.tripId, 
    trip: state.entities.trips[ownProps.match.params.tripId], 
    // postcards: state.entities.postcards[ownProps.match.params.id],
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrip: tripId => dispatch(fetchTrip(tripId)),
  // fetchTripPostcards: (tripId) => dispatch(fetchTripPostcards(tripId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripShow);