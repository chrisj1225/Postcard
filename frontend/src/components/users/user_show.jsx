import React from 'react'; 

import TripsIndexMap from '../maps/trips_index/trips_index_map'; 
import TripsIndex from '../trips/trips_index'; 

class UserShow extends React.Component {
  componentDidMount() {
    this.props.fetchUserTrips(this.props.userId); 
  }

  render() {
    const { trips, postcards, user, currentUser } = this.props; 

    if (!user) return null;

    const headline = user._id === currentUser._id ? "My Trips" : user.displayName + "'s trips"; 


    return (
      <div className="user-show-container">
        <aside>
          <div className="user-details">
            <h1>{headline}</h1>
          </div>
          <TripsIndex userShow={true} trips={trips} />
        </aside>
        <TripsIndexMap 
          key={`${Math.random()*100000000}`} 
          history={this.props.history} 
          trips={trips} postcards={postcards} 
        />
      </div>
    )
  }


}; 

export default UserShow; 