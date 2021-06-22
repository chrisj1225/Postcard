import React from 'react'; 
import TripIndexItem from './trip_index_item'; 

class TripsIndex extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { trips, userShow } = this.props; 

    const renderedTrips = Object.keys(trips).length ? (
      <>
        { trips.map((trip, i) => <TripIndexItem key={i} trip={trip} userShow={userShow} />) }
        <li className="empty-list-item"></li>
      </>
    ) : (
      <div>
        <h2>There aren't any trips here yet!</h2>
      </div>
    ); 


    return (
      <div className="trips-index">
        { renderedTrips }
      </div>
    )
  }
}


export default TripsIndex; 
