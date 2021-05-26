import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAllTrips /* fetchFollowedTrips */ } from '../../actions/trip_actions';				//actions
import Landing from './landing';				//display component

const mapStateToProps = (state) => ({
  trips: state.entities.trips,
  postcards: state.entities.postcards
  // currentUserId: state.session.id, 
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTrips: () => dispatch(fetchAllTrips()),
  // fetchFollowedTrips: (userId) => dispatch(fetchFollowedTrips(userId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing));