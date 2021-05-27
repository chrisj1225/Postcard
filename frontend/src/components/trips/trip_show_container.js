import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchTrip, deleteTrip } from '../../actions/trip_actions';				//actions
import TripShow from './trip_show';				//display component

const mapStateToProps = (state, ownProps) => {
  const tripId = ownProps.match.params.tripId;
  return({
    currentUser: state.session.user,
    trip: state.entities.trips[tripId],
    tripId: tripId,
    postcards: state.entities.postcards
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchTrip: (tripId) => dispatch(fetchTrip(tripId)),
  deleteTrip: (tripId) => dispatch(deleteTrip(tripId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripShow));