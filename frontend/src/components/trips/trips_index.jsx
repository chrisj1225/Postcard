import React from 'react'; 
import TripIndexItem from './trip_index_item'; 

class TripsIndex extends React.Component {
  constructor(props) {
    super(props); 
  }

  render() {
    const { trips, userShow } = this.props; 

    return (

      <div className="trips-index">
        { trips.map((trip, i) => <TripIndexItem key={i} trip={trip} userShow={userShow} />) }
        <li className="empty-list-item"></li>
      </div>
    )
  }
}


export default TripsIndex; 
