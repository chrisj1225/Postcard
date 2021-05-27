import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPostcard, updatePostcard } from '../../actions/postcard_actions';				//actions
import PostcardEditForm from './postcard_edit_form';				//display component

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.user;
  const postcardId = ownProps.match.params.postcardId;
  return({
    postcard: state.entities.postcards[postcardId],
    postcardId
  });
}

const mapDispatchToProps = (dispatch) => ({
    updatePostcard: (tripId, postcard) => dispatch(updatePostcard(tripId, postcard)),
    fetchPostcard: postcardId => dispatch(fetchPostcard(postcardId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostcardEditForm));