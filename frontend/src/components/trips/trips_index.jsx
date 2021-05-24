import React from 'react'; 
import TripIndexItem from './trip_index_item'; 

class TripsIndex extends React.Component {
  constructor(props) {
    super(props); 
  }

  componentDidMount() {
    this.props.fetchTrips(); 
  }


  render() {
    const { trips } = this.props; 

    return (

      <div>
        { Object.values(trips).map((trip, i) => <TripIndexItem key={i} trip={trip} />) }
      </div>
    )
  }
}


export default TripsIndex; 
