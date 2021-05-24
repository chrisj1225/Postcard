import React from 'react'; 

import PostcardIndexItem from '../postcards/postcards_index_item'; 
import TripShowMap from '../maps/trip_show_map'; 

class TripsShow extends React.Component {
  constructor(props) {
    super(props); 
  }


  render() {
    const { postcards } = this.props; 

    return (
      <>
        <TripShowMap postcards={postcards} />
        { Object.values(postcards).map(postcard => <PostcardIndexItem postcard={postcard}/> ) }
      </>
    )
  }
}