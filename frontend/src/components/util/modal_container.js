import {connect} from 'react-redux';
import { closeModal } from '../../actions/ui_actions';				//actions
import Modal from './modal';				//display component

const mapStateToProps = (state) => ({
  modalName: state.ui.modal, 
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);