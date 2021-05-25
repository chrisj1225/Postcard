import {connect} from 'react-redux';
// import { fetchPostcard } from '../../actions/postcard_actions';				//actions
import PostCardShow from './postcard_show';				//display component

const mapStateToProps = (state, ownProps) => ({
  postcard: state.entities.postcards[ownProps.match.params.id],
});

const mapDispatchToProps = (dispatch) => {
  
  return {};
  
  // return {
  // // () => dispatch(),
  // fetchPostcard: (id) => dispatch(fetchPostcard(id)),
  // // fetchImages
  // }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostCardShow);