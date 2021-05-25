import {connect} from 'react-redux';
// import {} from '../actions/';				//actions
import PostcardsIndex from './postcards_index';				//display component

const mapStateToProps = (state, ownProps) => ({
  postcards: state.entities.postcards[ownProps.match.params.id],
});

const mapDispatchToProps = (dispatch) => ({
  fetchTripPostcards: (tripId) => dispatch(fetchTripPostcards(tripId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostcardsIndex);