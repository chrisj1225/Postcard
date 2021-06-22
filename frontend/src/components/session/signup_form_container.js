import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signup, login } from '../../actions/session_actions';
import { openModal } from '../../actions/ui_actions';
import SignupForm from './signup_form';

const mSTP = (state) => {
  return ({
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
  });
};

const mDTP = (dispatch) => {
  return ({
    login: user => dispatch(login(user)),
    signup: user => dispatch(signup(user)),
    openModal: (modalName) => dispatch(openModal(modalName)) 
  });
};

export default withRouter(connect(mSTP, mDTP)(SignupForm));