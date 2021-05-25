import React from 'react'; 
import TripIndexItem from './trip_index_item'; 

class TripsIndex extends React.Component {
  constructor(props) {
    super(props); 
  }

  render() {
    const { trips } = this.props; 

    return (

      <div className="trips-index">
        { Object.values(trips).map((trip, i) => <TripIndexItem key={i} trip={trip} />) }
      </div>
    )
  }
}


export default TripsIndex; 
