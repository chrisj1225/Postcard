import React from 'react';
import { Link } from 'react-router-dom'; 
// import Logo from '../../assets/images/postcard-logo.png'
import unfilledLogo from '../../assets/images/postcard-unfilled.png'
import filledLogo from '../../assets/images/postcard-filled.png'


class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = { filled: false }; 

    this.toggleFilled = this.toggleFilled.bind(this); 
  }

  toggleFilled() {
    this.setState({filled: !this.state.filled})
  }

  render() {
    const buttons = this.props.loggedIn ? (
      <>
        <button onClick={() => this.props.logout()}>Logout</button>
      </>
    ) : (
      <>
        <button onClick={() => this.props.openModal("signup")}>Signup</button>
        <button onClick={() => this.props.openModal("login")}>Login</button>
      </>
    )

    return (
      <header className="site-header">
        <div className="content">
          <Link to="/">
            {/* <h1 className="logo">
              Postcard
            </h1> */}
            {/* {<img className="logo" src={Logo} alt="Postcard logo"/>} */}
            <img 
              className="logo"
              onMouseOver={this.toggleFilled}  
              onMouseLeave={this.toggleFilled}  
              src={this.state.filled ? filledLogo : unfilledLogo} alt="Postcard Logo"/>
          </Link>
          <div className="session-btns">
            { buttons }
          </div>
        </div>
      </header>
    )
  }
}

export default Header;



// displays the username with a downarrow chevron next to it. When click it opens a dropdown with one item, 'edit username'
// when clicked, it flips into an input that is saved in the header 