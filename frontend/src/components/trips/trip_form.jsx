import React from 'react';

class TripForm extends React.Component{
  constructor(props) {
    super(props)

    this.state = this.props.trip
  
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state)
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
      <div className="create-trip-container">
        <h1>{this.props.formType}</h1>
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
            type="submit" 
            value={this.props.formType} />
        </form>

      </div>
    )
  }
}

export default TripForm;