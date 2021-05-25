import { connect } from 'react-redux';
import { fetchAllTrips /* fetchFollowedTrips */ } from '../../actions/trip_actions';				//actions
import Landing from './landing';				//display component

const mapStateToProps = (state) => ({
  trips: state.entities.trips,
  // currentUserId: state.session.id, 
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTrips: () => dispatch(fetchAllTrips()),
  // fetchFollowedTrips: (userId) => dispatch(fetchFollowedTrips(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing);