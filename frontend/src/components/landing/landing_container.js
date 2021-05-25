import { connect } from 'react-redux';
// import { fetchTrips, /* fetchFollowedTrips */ } from '../../actions/trips_actions';				//actions
import Landing from './landing';				//display component

const mapStateToProps = (state) => ({
  // trips: state.entities.trips,
  // currentUserId: state.session.id, 
});

const mapDispatchToProps = (dispatch) => ({
  // fetchTrips: () => dispatch(fetchTrips()),
  // fetchFollowedTrips: (userId) => dispatch(fetchFollowedTrips(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing);