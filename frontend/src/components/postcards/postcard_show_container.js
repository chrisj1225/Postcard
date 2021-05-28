import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPostcard, updatePostcardPhotos, deletePostcard, deletePostcardPhoto } from '../../actions/postcard_actions';				//actions

import PostCardShow from './postcard_show';				//display component

const mapStateToProps = (state, ownProps) => {
  const postcard = state.entities.postcards[ownProps.match.params.postcardId];
  return ({
    currentUser: state.session.user,
    postcardId: ownProps.match.params.postcardId,
    postcard
  });
}


const mapDispatchToProps = (dispatch) => {  
  return ({
    fetchPostcard: (postcardId) => dispatch(fetchPostcard(postcardId)),
    updatePostcardPhotos: (postcardId, photos) => (
      dispatch(updatePostcardPhotos(postcardId, photos))
    ),
    deletePostcard: (tripId, postcardId) => (
      dispatch(deletePostcard(tripId, postcardId))
    ), 
    deletePostcardPhoto: (postcardId, imageUrl) => (
      dispatch(deletePostcardPhoto(postcardId, imageUrl))
    ),
  })
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostCardShow));