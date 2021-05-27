import TripsIndexMap from './trips_index_map';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { attachAllTripPos } from '../../../util/selectors';

const mSTP = (state, ownProps) => {
  
  const trips = attachAllTripPos(state.trips, state.postcards);
  return {
    
  }
};

const mDTP = dispatch => {

  return {
    
  }
};

export default withRouter(connect(mSTP, mDTP)(TripsIndexMap));