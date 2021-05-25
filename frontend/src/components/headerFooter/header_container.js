import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/ui_actions';

import Header from './header';

const mSTP = state => {
  return({
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user, 
  })
};

const mDTP = dispatch => {
  return({
    logout: () => dispatch(logout()),
    openModal: (modalName) => dispatch(openModal(modalName))
  })
}

export default connect(mSTP, mDTP)(Header);
