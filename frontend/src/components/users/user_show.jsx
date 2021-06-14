import React from 'react'; 
import { Link } from 'react-router-dom'; 

import TripsIndexMap from '../maps/trips_index/trips_index_map'; 
import TripsIndex from '../trips/trips_index'; 
import AddButton from '../util/add_button'; 

class UserShow extends React.Component {
  componentDidMount() {
    this.props.fetchUserTrips(this.props.userId); 
  }

  handleClick() {

  }

  render() {
    const { trips, postcards, user, currentUser } = this.props; 

    if (!user) return null;

    const currentUsersPage = user._id === currentUser._id; 
    const headline = currentUsersPage ? "My Trips" : user.displayName + "'s trips"; 

    return (
      <div className="user-show-container">
        <aside>
          <div className="user-details">
            <h1>{headline}</h1>
          </div>
          <TripsIndex userShow={true} trips={trips} /> 
          { currentUsersPage ? (
            <Link to={"/trips/new"}>
              <AddButton />
            </Link>
          ) : null}
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