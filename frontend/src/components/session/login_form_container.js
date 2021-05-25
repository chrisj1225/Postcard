import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { openModal } from '../../actions/ui_actions';
import LoginForm from './login_form';

const mSTP = (state) => {
  return ({
    errors: state.errors.session
  });
};

const mDTP = (dispatch) => {
  return ({
    login: user => dispatch(login(user)),
    openModal: (modalName) => dispatch(openModal(modalName)) 
  });
}

export default connect(mSTP, mDTP)(LoginForm);