import React from 'react'; 
import { Link } from 'react-router-dom'; 

import PostcardIndexItem from '../postcards/postcards_index_item'; 
import TripShowMap from '../maps/trip_show/trip_show_map';
import AddButton from '../util/add_button'; 

import arrow from '../../assets/images/arrow.png'; 


class TripShow extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      followed: false
    }

    this.deleteTrip = this.deleteTrip.bind(this);
    this.toggleFollow = this.toggleFollow.bind(this);
  }

  componentDidMount() {
    // debugger
    this.props.fetchTrip(this.props.tripId)
      .then(res => {
        if (Object.values(this.props.currentUser).length) {
          if (this.props.currentUser.following.includes(this.props.trip.travellerId)) {
            this.setState({
              followed: true
            })
          }
        }

      })
  }

  deleteTrip() {
    this.props.deleteTrip(this.props.tripId)
      .then(this.props.history.push('/'));
  }

  toggleFollow() {
    if (!this.state.followed) {
      this.props.createFollow(this.props.trip.travellerId)
        .then(res => {
          this.setState({
            followed: true
          })
        })
    } else {
      this.props.deleteFollow(this.props.trip.travellerId)
        .then(res => {
          this.setState({
            followed: false
          })
        })
    }
  }

  render() {
    const { postcards, trip, currentUser, history } = this.props; 
    if (!trip) return null; 

    const arrowComponent = <img className="arrow" src={arrow} alt=""/>

    let createPostcardComponent; 
    let editTripLink;
    let deleteTripButton;

    if (currentUser && (currentUser._id === trip.travellerId)) {
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

    if ((currentUser) && (currentUser._id === trip.travellerId)) {
      createPostcardComponent = (
        <div className={"create-postcard-wrapper postcard-index-item "}>
          <div className="create-postcard-card">
            <Link to={`/trips/${trip._id}/postcards/new`}>
              <h3>Create New Postcard</h3>
              <AddButton />
            </Link>
          </div>
          { arrowComponent }
        </div>
      );

      editTripLink = (
        <Link className="edit-trip" to={`/trips/${trip._id}/edit`}>Edit Trip</Link>
      )

      deleteTripButton = (
        <a onClick={this.deleteTrip}
          className="delete-trip" >Delete Trip</a>
      )
    };

    let followButton 
    if (Object.values(currentUser).length) {
      followButton = (this.state.followed) ? (
        <button className="follow-btn" onClick={this.toggleFollow}>Following</button>
      ) : (
        <button className="follow-btn" onClick={this.toggleFollow}>Follow</button>
      );
    } else {
      followButton = null;
    };

    return (
      <main className="trip-show-wrapper">
        <section>
          <Link to="/">Back to trips</Link>
          {editTripLink}
          {deleteTripButton}
          <h1>{trip.title}</h1>
          <p>{trip.description}</p>
          <div className="user-info">
            {followButton}
            <p>{this.props.trip.travellerName}</p>
          </div>
        </section>
        <TripShowMap key={`trip-show-map-${trip._id}`} history={history} postcards={postcards} trip={trip}/>
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