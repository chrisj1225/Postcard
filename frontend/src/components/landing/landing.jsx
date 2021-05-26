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
    if (this.props.loggedIn) {
      this.props.history.push('/trips/new');
    } else {
      document.body.style.overflow = 'hidden';
      this.props.openModal("login"); 
    }
  }


  render() {
    const { trips } = this.props; 

    return (
      <div className="landing-container">
        <TripsIndexMapContainer trips={trips} />
        <aside>
          <div className="filter-dropdown">
            <a className="filter-button">{this.state.followed ? "Followed" : "All"}</a>
          </div>
          <TripsIndex trips={trips} />
        </aside>
        <AddButton handleClick={this.handleClick}/>
      </div>
    )
  }
}; 

export default Landing; 