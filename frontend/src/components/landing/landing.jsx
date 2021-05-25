import React from 'react'; 

import TripsIndexMapContainer from '../maps/trips_index/trips_index_map_container'; 
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
    // this.props.fetchFollowedTrips(this.props.currentUserId)
    //   .then(
    //     this.setState({followed: !this.state.followed})
    //   )
  }
  
  render() {
    const { trips } = this.props; 

    return (
      <div classname="landing-container">Landing
        <TripsIndexMapContainer trips={trips} />
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