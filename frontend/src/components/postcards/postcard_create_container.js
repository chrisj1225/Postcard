import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPostcard } from '../../actions/postcard_actions';				//actions
import PostcardCreateForm from './postcard_create_form';				//display component

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.user;
  const tripId = ownProps.match.params.tripId;
  return({
    newPostcard: {
      title: "",
      body: "",
      tripId: tripId,
      latitude: null,
      longitude: null,
      photos: []
    }
  });
}

const mapDispatchToProps = (dispatch) => ({
    createPostcard: (tripId, postcard) => dispatch(createPostcard(tripId, postcard))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostcardCreateForm));