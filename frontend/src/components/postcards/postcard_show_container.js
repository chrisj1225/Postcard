import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPostcard } from '../../actions/postcard_actions';				//actions
import PostCardShow from './postcard_show';				//display component

const mapStateToProps = (state, ownProps) => {
  // 
  return ({
    postcardId: ownProps.match.params.postcardId,
    postcard: state.entities.postcards[ownProps.match.params.postcardId],
  });
}


const mapDispatchToProps = (dispatch) => {  
  return ({
    fetchPostcard: (postcardId) => dispatch(fetchPostcard(postcardId)),
    // fetchImages
  })
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostCardShow));