import {connect} from 'react-redux';
import { fetchTrips } from '../../actions/trip_actions';				//actions
import TripsIndex from './trips_index';				//display component

const mapStateToProps = (state) => ({
  trips: state.entities.trips, 
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrips: () => dispatch(fetchTrips()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripsIndex);