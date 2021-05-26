import React from 'react';

class TripCreateForm extends React.Component{
  constructor(props) {
    super(props)

    this.state = this.props.newTrip
  
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createTrip(this.state)
      .then((res) => {
        this.props.history.push(`/trips/${res.trip._id}`)
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
        <div className="create-trip-container">
          <h1>Create New Trip</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Trip Title
              <input 
                type="text"
                onChange={this.update('title')}
                value={this.state.title} />
            </label>
            <br />
            <label>Description
              <textarea 
                onChange={this.update('description')}
                value={this.state.description}
                rows="10"
                cols="80" />
            </label>
            <br />
            <input 
              onClick={this.handleSubmit}
              type="submit" 
              value="Create" />
          </form>

        </div>
      </div>
    )
  }
}

export default TripCreateForm;