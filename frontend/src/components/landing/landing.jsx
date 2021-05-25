import React from 'react'; 

import TripsIndexMap from '../maps/trips_index_map'; 
import TripsIndex from '../trips/trips_index'; 

class Landing extends React.Component {
  constructor(props) {
    super(props); 

    this.state = { followed: false }
  }


  componentDidMount() {
    // this.props.fetchTrips(); 
  }

  toggleFollowed() {
    this.props.fetchFollowedTrips(this.props.currentUserId)
      .then(
        this.setState({followed: !this.state.followed})
      )
  }
  
  render() {
    const { trips } = this.props; 

    return (
      <div classname="landing-container">Landing
        <TripsIndexMap trips={trips} />
        <aside>
          <div className="filter-dropdown">
            <a className="filter-button">{this.state.followed ? "All" : "Followed"}</a>
          </div>
          <TripsIndex trips={trips} />
        </aside>
      </div>
    )
  }
}; 

export default Landing; 