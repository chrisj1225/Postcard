import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAllTrips /* fetchFollowedTrips */ } from '../../actions/trip_actions';				//actions
import { openModal } from '../../actions/ui_actions';
import { attachAllPhotoTiles } from '../../util/selectors'; 
import { fetchFollowedTrips } from '../../actions/follow_actions'

import Landing from './landing';				//display component

const mapStateToProps = (state) => {
  const trips = attachAllPhotoTiles(
    state.entities.trips, 
    state.entities.postcards
  ); 
  
  return ({
    trips,
    loggedIn: state.session.isAuthenticated,
    postcards: state.entities.postcards,
    currentUser: state.session.user, 
})};

const mapDispatchToProps = (dispatch) => ({
  fetchAllTrips: () => dispatch(fetchAllTrips()),
  openModal: (type) => dispatch(openModal(type)),
  fetchFollowedTrips: () => dispatch(fetchFollowedTrips()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing));