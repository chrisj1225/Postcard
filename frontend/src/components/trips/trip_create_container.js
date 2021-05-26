import {connect} from 'react-redux';
import { createTrip } from '../../actions/trip_actions';				//actions
import TripCreate from './trip_create_form';				//display component

const mapStateToProps = (state) => {
  const currentUser = state.session.user;
  return({
    trips: state.entities.trips, 
    newTrip: {
      title: "",
      travellerId: currentUser.id,
      description: ""
    }
  });
}

const mapDispatchToProps = (dispatch) => ({
    createTrip: (trip) => dispatch(createTrip(trip))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripCreate);