import {connect} from 'react-redux';
import {} from '../actions/';				//actions
import TripShow from './trip_show';				//display component

const mapStateToProps = (state) => ({
  postcards: state.entities.postcards[ownProps.match.params.id],
});

const mapDispatchToProps = (dispatch) => ({
  fetchTripPostcards: (tripId) => dispatch(fetchTripPostcards(tripId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripShow);