import React from 'react';
import { withRouter } from 'react-router-dom';
import stamp from '../../assets/images/blue-stamp.png';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
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
      .then( () => {
        document.body.style.overflow = 'unset';
        this.props.history.push('/landing'); 
      })
  }

  handleDemoLogin(e) {
    e.preventDefault();
    const demoUser = { email: 'demo@mail.com', password: 'password' }; 
    this.props.login(demoUser).then(() => document.body.style.overflow = 'unset'); 
  }

  render() {
    return (
      <div>
        <div className="other-form-btn">
          <span onClick={() => this.props.openModal('signup')}><img src={stamp} alt="stamp" />
          <i>To Signup</i>
          </span>
        </div>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <div className="demo-login-button-container">
            <button 
              type="button"
              onClick={this.handleDemoLogin} 
              className="demo-login-button"
            >Demo Login</button>
            <div>
              <hr/>
              <p>Or</p>
              <hr/>
            </div>
          </div>
          <label>Email
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
            />
            <p className="errors">{this.props.errors.email}</p>
          </label>
          <label>Password
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
            />
            <p className="errors">{this.props.errors.password}</p>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);