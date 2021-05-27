import React from 'react'; 
import { Link } from 'react-router-dom'; 

import PostcardIndexItem from '../postcards/postcards_index_item'; 
import TripShowMap from '../maps/trip_show/trip_show_map_container';
import AddButton from '../util/add_button'; 

import arrow from '../../assets/images/arrow.png'; 


class TripShow extends React.Component {
  constructor(props) {
    super(props); 
  }

  componentDidMount() {
    this.props.fetchTrip(this.props.tripId)
  }

  render() {
    const { postcards, trip, currentUser } = this.props; 

    if (!trip) return null; 

    const arrowComponent = <img className="arrow" src={arrow} alt=""/>

    let createPostcardComponent; 

    if (currentUser && (currentUser.id === trip.travellerId)) {
      if (!postcards) {
        return (
          <section>
            <h2>There aren't any postcards here yet.</h2>
            <h3>Make a postcard</h3>
            <AddButton />
          </section>
        )
      }
    };

    if (currentUser) {
      createPostcardComponent = currentUser.id === trip.travellerId ? (
        <div className={"create-postcard-wrapper postcard-index-item "}>
          <div className="create-postcard-card">
            <Link to={`/trips/${trip._id}/postcards/new`}>
              <h3>Create New Postcard</h3>
              <AddButton />
            </Link>
          </div>
          { arrowComponent }
        </div>
      ) : null; 
    };

    return (
      <main className="trip-show-wrapper">
        <section>
          <Link to="/">Back to trips</Link>
          <h1>{trip.title}</h1>
          <p>{trip.description}</p>
        </section>
        <TripShowMap postcards={postcards} />
        <article>
          { Object.values(postcards).map(postcard => <PostcardIndexItem 
            key={postcard._id} 
            postcard={postcard} 
            arrow={arrowComponent}/> ) }
          { createPostcardComponent }
        </article>
      </main>
    )
  }
}

export default TripShow; 