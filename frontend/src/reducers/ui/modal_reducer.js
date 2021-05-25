import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../../actions/ui_actions';

const ModalReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case OPEN_MODAL:
      return action.modalName;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}

export default ModalReducer;