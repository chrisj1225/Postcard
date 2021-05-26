import React from 'react';
import { withRouter } from 'react-router-dom';
import stamp from '../../assets/images/blue-stamp.png';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      displayName: '',
      password: '',
      password2: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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
      .then( () => {
        document.body.style.overflow = 'unset';
        this.props.history.push('/landing'); 
      })
  }

  render() {
    return (
      <div>
        <div className="other-form-btn">
          <span onClick={() => this.props.openModal('login')}><img src={stamp} alt="stamp" />
          <i>To Login</i>
          </span>
        </div>
        <form onSubmit={this.handleSubmit}>
          <h1>Sign Up</h1>
          <label>Email
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
            />
            <p className="errors">{this.props.errors.email}</p>
          </label>
          <label>Display Name
            <input type="text"
              value={this.state.handle}
              onChange={this.update('displayName')}
            />
            <p className="errors">{this.props.errors.displayName}</p>
          </label>
          <label>Password
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
            />
            <p className="errors">{this.props.errors.password}</p>
          </label>
          <label>Confirm Password
            <input type="password"
              value={this.state.password2}
              onChange={this.update('password2')}
            />
            <p className="errors">{this.props.errors.password2}</p>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SignupForm;
// export default withRouter(SignupForm);