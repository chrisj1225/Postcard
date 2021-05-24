import {connect} from 'react-redux';
import {} from '../actions/';				//actions
import TripsShow from './trips_show';				//display component

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  // () => dispatch(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripsShow);