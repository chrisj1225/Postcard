import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchTripPostcards } from '../../actions/postcard_actions';				//actions
import TripShow from './trip_show';				//display component

const mapStateToProps = (state, ownProps) => {
  return({
    tripId: ownProps.match.params.id,
    postcards: state.entities.postcards
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchTripPostcards: (tripId) => dispatch(fetchTripPostcards(tripId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripShow));