import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user)
      .then(this.props.history.push('/landing'))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <label>Email
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
            />
            <p>{this.props.errors.email}</p>
          </label>
          <label>Password
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
            />
            <p>{this.props.errors.password}</p>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);