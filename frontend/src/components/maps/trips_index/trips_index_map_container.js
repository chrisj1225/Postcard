import TripsIndexMap from './trips_index_map';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mSTP = (state, ownProps) => {
  const trips = Object.values(state.entities.trips);
  return {
    trips,
  }
};

const mDTP = dispatch => {

  return {
    
  }
};

export default withRouter(connect(mSTP, mDTP)(TripsIndexMap));