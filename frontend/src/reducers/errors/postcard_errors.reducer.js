import { 
  RECEIVE_POSTCARD_ERRORS,
  CLEAR_POSTCARD_ERRORS
} from '../../actions/trip_actions';

const PostcardErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POSTCARD_ERRORS:
      return action.errors;
    case CLEAR_POSTCARD_ERRORS:
      return [];
    default:
      return state;
  }
}

export default PostcardErrorsReducer;