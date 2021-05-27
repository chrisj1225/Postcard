import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAllTrips /* fetchFollowedTrips */ } from '../../actions/trip_actions';				//actions
import { openModal } from '../../actions/ui_actions';
import { attachAllPhotoTiles } from '../../util/selectors'; 


import Landing from './landing';				//display component

const mapStateToProps = (state) => {
  const trips = attachAllPhotoTiles(
    state.entities.trips, 
    state.entities.postcards
  ); 
  
  return ({
    trips,
    loggedIn: state.session.isAuthenticated,
    postcards: state.entities.postcards
  // currentUserId: state.session.id, 
})};

const mapDispatchToProps = (dispatch) => ({
  fetchAllTrips: () => dispatch(fetchAllTrips()),
  openModal: (type) => dispatch(openModal(type)),
  // fetchFollowedTrips: (userId) => dispatch(fetchFollowedTrips(userId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing));