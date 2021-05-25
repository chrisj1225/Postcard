import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      displayName: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      displayName: this.state.displayName,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user)
      .then(this.props.history.push('/landing'))
  }

  renderErrors() {
    return Object.keys(this.state.errors).length ? (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    ) : null;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Sign Up</h1>
          <label>Email
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
            />
          </label>
          <label>Display Name
            <input type="text"
              value={this.state.handle}
              onChange={this.update('displayName')}
            />
          </label>
          <label>Password
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
            />
          </label>
          <label>Confirm Password
            <input type="password"
              value={this.state.password2}
              onChange={this.update('password2')}
            />
          </label>
          <input type="submit" value="Submit" />
          {this.renderErrors()}
        </form>
      </div>
    );
  }
}

export default SignupForm;
// export default withRouter(SignupForm);