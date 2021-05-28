import React from 'react';
import { Link } from 'react-router-dom';
import PostcardCreateMap from '../maps/postcard_create/postcard_create_map';

class PostcardCreateForm extends React.Component{
  constructor(props) {
    super(props)

    this.state = this.props.newPostcard;
  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.handlePositionInput = this.handlePositionInput.bind(this);
  }

  handlePositionInput(position) {
    this.setState({
      lat: position.lat,
      lng: position.lng,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createPostcard(this.state.tripId, this.state)
      .then((res) => {
        if (res.errors) {
          Object.values(res.errors).forEach(err => {
            alert(err)
          })
        } else {
          this.props.history.push(`/postcards/${res.postcard._id}`)
        }
      })
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  render() {

    let inputEmpty = false;
    if ((this.state.title.length < 1) || 
      (this.state.body.length < 1) || 
      (this.state.lat.length < 1) || 
      (this.state.lng.length < 1)) {
      inputEmpty = true;
    };

    return(
      <div className="postcard-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="back-btn">
            <Link to={`/trips/${this.state.tripId}`}>Back to Trip</Link>
            <p></p>
          </div>
          <h1>Create New Postcard</h1>
          <label>Postcard Title
            <input 
              type="text"
              onChange={this.update('title')}
              value={this.state.title} />
          </label>
          <label>Body
            <textarea 
              onChange={this.update('body')}
              value={this.state.body}
              rows="6"
              cols="50" />
          </label>
          {/* <label>Latitude
            <input 
              onChange={this.update('lat')}
              value={this.state.lat} />
          </label>
          <label>Longitude
            <input 
              onChange={this.update('lng')}
              value={this.state.lng} />
          </label> */}
          <input 
            onClick={this.handleSubmit}
            disabled={inputEmpty}
            type="submit" 
            value="Create Postcard" />
          <Link className="cancel-btn" to={`/trips/${this.state.tripId}`}>Cancel</Link>
        </form>
        <aside>
          <header className="coordinates">
            <p>Lat: <span>{this.state.lat}</span></p>
            <p>Lng: <span>{this.state.lng}</span></p>
          </header>
          <PostcardCreateMap 
            handlePositionInput={position => this.handlePositionInput(position)}
            formType={'create'} />
        </aside>
      </div>
    )
  }
}

export default PostcardCreateForm;