import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchTrip, deleteTrip } from '../../actions/trip_actions';				//actions
import { createFollow, deleteFollow } from '../../actions/follow_actions';
import TripShow from './trip_show';				//display component

const mapStateToProps = (state, ownProps) => {
  const tripId = ownProps.match.params.tripId;
  const currentUser = state.session.user;
  return({
    currentUser,
    trip: state.entities.trips[tripId],
    tripId: tripId,
    postcards: state.entities.postcards
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchTrip: (tripId) => dispatch(fetchTrip(tripId)),
  deleteTrip: (tripId) => dispatch(deleteTrip(tripId)),
  createFollow: (userId) => dispatch(createFollow(userId)),
  deleteFollow: (userId) => dispatch(deleteFollow(userId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripShow));