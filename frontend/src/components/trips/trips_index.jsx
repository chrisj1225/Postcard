import React from 'react'; 
import TripIndexItem from './trip_index_item'; 

class TripsIndex extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { trips, userShow, loadMoreTrips, thereAreMoreTrips } = this.props; 
    
    const tripsList = Object.keys(trips).length ? (
      <>
        { trips.map((trip, i) => <TripIndexItem key={i} trip={trip} userShow={userShow} />) }
        {
          thereAreMoreTrips ? 
          <button onClick={loadMoreTrips} className="load-trips-btn">Load more trips</button> : 
          null
        }
        <li className="empty-list-item"></li>
      </>
    ) : (
      <div>
        <h2>There aren't any trips here yet!</h2>
      </div>
    ); 


    return (
      <div className="trips-index">
        { tripsList }
      </div>
    )
  }
}


export default TripsIndex; 
