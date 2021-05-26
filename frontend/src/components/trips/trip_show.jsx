import React from 'react'; 

import PostcardIndexItem from '../postcards/postcards_index_item'; 
import TripShowMap from '../maps/trip_show/trip_show_map_container'; 

class TripShow extends React.Component {
  constructor(props) {
    super(props); 
  }

  componentDidMount() {
    this.props.fetchTrip(this.props.tripId); 
  }

  render() {
    const { postcards, trip, currentUser } = this.props; 

    if (!trip) return null; 

    const createCardComponent = currentUser.id === trip.travellerId ? (
      <div></div>
    ) : null; 

    debugger

    return (
      <main className="trip-show-wrapper">
        <section>
          <h1>{trip.title}</h1>
          <p>{trip.description}</p>
        </section>
        <TripShowMap postcards={postcards} />
        <article>
          {/* { Object.values(postcards).map(postcard => <PostcardIndexItem postcard={postcard}/> ) } */}
          <div className="postcard-index-item"></div>
          <div className="postcard-index-item"></div>
          <div className="postcard-index-item"></div>
          <div className="postcard-index-item"></div>
        </article>
      </main>
    )
  }
}

export default TripShow; 