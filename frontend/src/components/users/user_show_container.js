import {connect} from 'react-redux';
import { fetchUserTrips } from '../../actions/trip_actions';				//actions
import UserShow from './user_show';				//display component

import { attachAllPhotoTiles } from '../../util/selectors'; 

const mapStateToProps = (state, ownProps) => {
  const trips = attachAllPhotoTiles(
    state.entities.trips, 
    state.entities.postcards
  ); 
  
  debugger

  return ({
    trips, 
    postcards: state.entities.postcards,   
    user: state.entities.user, 
    userId: ownProps.match.params.userId, 
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchUserTrips: (userId) => dispatch(fetchUserTrips(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserShow);