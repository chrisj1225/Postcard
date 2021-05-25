import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../../actions/ui_actions';

import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';

const ModalReducer = (state = null, action) => {
  Object.freeze(state);
  switch(action.type) {
    case OPEN_MODAL:
      return action.modalName;
    case CLOSE_MODAL:
      return null;
    case RECEIVE_CURRENT_USER:
      return null;
    default:
      return state;
  }
}

export default ModalReducer;