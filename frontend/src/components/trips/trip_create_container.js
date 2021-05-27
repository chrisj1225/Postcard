import {connect} from 'react-redux';
import { createTrip } from '../../actions/trip_actions';				//actions
import TripForm from './trip_form';				//display component

const mapStateToProps = (state) => {
  const currentUser = state.session.user;
  return({
    trips: state.entities.trips, 
    trip: {
      title: "",
      travellerId: currentUser.id,
      description: ""
    },
    formType: 'Create Trip'
  });
}

const mapDispatchToProps = (dispatch) => ({
    action: (trip) => dispatch(createTrip(trip))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripForm);