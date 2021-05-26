import React from 'react'; 

import TripsIndexMapContainer from '../maps/trips_index/trips_index_map_container'; 
import TripsIndex from '../trips/trips_index'; 
import AddButton from '../util/add_button'; 

class Landing extends React.Component {
  constructor(props) {
    super(props); 

    this.state = { followed: false }

    this.handleClick = this.handleClick.bind(this); 
  }

  componentDidMount() {
    this.props.fetchAllTrips()
  }

  toggleFollowed() {
    // this.props.fetchFollowedTrips(this.props.currentUserId)
    //   .then(
    //     this.setState({followed: !this.state.followed})
    //   )
  }
  
  handleClick() {
    // create trip
    this.props.history.push('/trips/new');
  }


  render() {
    const { trips } = this.props; 
    
    return (
      <div className="landing-container">
        <TripsIndexMapContainer trips={trips} />
        <aside>
          <div className="filter-dropdown">
            <a className="filter-button">{this.state.followed ? "All" : "Followed"}</a>
          </div>
          <TripsIndex trips={trips} />
          <AddButton handleClick={this.handleClick}/>
        </aside>
      </div>
    )
  }
}; 

export default Landing; 