import React from 'react'; 

import PostcardIndexItem from '../postcards/postcards_index_item'; 
import TripShowMap from '../maps/trip_show/trip_show_map_container'; 

class TripShow extends React.Component {
  constructor(props) {
    super(props); 
  }

  componentDidMount() {
    this.props.fetchTripPostcards(this.props.tripId)
  }

  render() {
    const { postcards } = this.props; 

    return (
      <>
        TripShow
        <TripShowMap postcards={postcards} />
        { Object.values(postcards).map(postcard => <PostcardIndexItem postcard={postcard}/> ) }
      </>
    )
  }
}

export default TripShow; 