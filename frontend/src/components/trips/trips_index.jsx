import React from 'react'; 
import TripIndexItem from './trip_index_item'; 

class TripsIndex extends React.Component {
  constructor(props) {
    super(props); 
  }

  componentDidMount() {
    // this.props.fetchTrips(); 
  }


  render() {
    const { trips } = this.props; 

    return (

      <div className="trip-index-container">
        {/* { Object.values(trips).map((trip, i) => <TripIndexItem key={i} trip={trip} />) } */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
}


export default TripsIndex; 
