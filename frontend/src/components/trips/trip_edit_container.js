import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchTrip, updateTrip } from '../../actions/trip_actions';				//actions
import TripForm from './trip_form';				//display component

class TripEditForm extends React.Component {

  componentDidMount() {
    this.props.fetchTrip(this.props.tripId);
  }

  render() {
    const { action, formType, trip, history } = this.props;
    if (!trip) return null;

    return (
      <TripForm
        action={action}
        formType={formType}
        trip={trip}
        history={history}
         />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return({
    tripId: ownProps.match.params.tripId,
    trip: state.entities.trips[ownProps.match.params.tripId],
    formType: 'Update Trip',
    history: ownProps.history
  });
}

const mapDispatchToProps = (dispatch) => ({
    fetchTrip: (tripId) => dispatch(fetchTrip(tripId)),
    action: (trip) => dispatch(updateTrip(trip))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripEditForm));