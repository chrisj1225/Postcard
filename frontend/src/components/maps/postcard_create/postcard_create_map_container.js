import PostcardCreateMap from './postcard_create_map';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { attachAllTripPos } from '../../../util/selectors';

const mSTP = (state, ownProps) => {
  return {

  }
};

const mDTP = dispatch => {

  return {

  }
};

export default withRouter(connect(mSTP, mDTP)(PostcardCreateMap));