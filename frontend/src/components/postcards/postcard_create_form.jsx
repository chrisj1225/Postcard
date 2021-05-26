import React from 'react';

class PostcardCreateForm extends React.Component{
  constructor(props) {
    super(props)

    this.state = this.props.newPostcard;
  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createPostcard(this.state.tripId, this.state)
      .then((res) => {
        debugger
        this.props.history.push(`/postcards/${res.postcard.data._id}`)
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