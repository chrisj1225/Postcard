import React from 'react';
import PostcardCreateMapContainer from '../maps/postcard_create/postcard_create_map_container';

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
        this.props.history.push(`/postcards/${res.postcard._id}`)
      });
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  render() {
    return(
      <div>
        <div className="create-postcard-container">
          <PostcardCreateMapContainer handlePositionInput={position => this.handlePositionInput(position)} />
          <input type="text" id="cpf-search" />
          <h1>Create New Postcard</h1>
          <form onSubmit={this.handleSubmit}>
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
                rows="10"
                cols="80" />
            </label>
            <label>Latitude
              <input 
                onChange={this.update('lat')}
                value={this.state.lat} />
            </label>
            <label>Longitude
              <input 
                onChange={this.update('lng')}
                value={this.state.lng} />
            </label>
            <input 
              onClick={this.handleSubmit}
              type="submit" 
              value="Create Postcard" />
          </form>

        </div>
      </div>
    )
  }
}

export default PostcardCreateForm;