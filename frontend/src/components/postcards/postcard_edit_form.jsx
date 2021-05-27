import React from 'react';
import PostcardCreateMap from '../maps/postcard_create/postcard_create_map';

class PostcardEditForm extends React.Component{
  constructor(props) {
    super(props)

    // this.state = this.props.postcard
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.handlePositionInput = this.handlePositionInput.bind(this);
  }

  componentDidMount() {
    this.props.fetchPostcard(this.props.postcardId)
      .then(res => {
        debugger
        this.setState({
          id: this.props.postcard._id,
          title: this.props.postcard.title,
          body: this.props.postcard.body,
          tripId: this.props.postcard.tripId,
          lat: this.props.postcard.lat.$numberDecimal,
          lng: this.props.postcard.lng.$numberDecimal,
          photos: this.props.postcard.photos
        })
      })
  }

  handlePositionInput(position) {
    this.setState({
      lat: position.lat,
      lng: position.lng,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updatePostcard(this.state.tripId, this.state)
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
    const { postcard } = this.props;
    if (!postcard) return null;
    if (!this.state) return null;

    return(
      <div className="create-postcard-container">
        <form onSubmit={this.handleSubmit}>
          <h1>Update Postcard</h1>
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
            type="submit" 
            value="Update Postcard" />
        </form>
        <aside>
          <header className="coordinates">
            <p>Lat: <span>{this.state.lat}</span></p>
            <p>Lng: <span>{this.state.lng}</span></p>
          </header>
          <PostcardCreateMap handlePositionInput={position => this.handlePositionInput(position)} />
          <input type="text" id="cpf-search" placeholder="Search for a destination" />
        </aside>
      </div>
    )
  }
}

export default PostcardEditForm;