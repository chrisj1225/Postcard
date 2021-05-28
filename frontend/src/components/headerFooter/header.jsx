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
    this.openModal = this.openModal.bind(this)
  }

  toggleFilled() {
    this.setState({filled: !this.state.filled})
  }

  openModal(type) {
    return () => {
      document.body.style.overflow = 'hidden';
      this.props.openModal(type); 
    }
  }

  render() {
    const buttons = this.props.loggedIn ? (
      <>
        <button onClick={() => this.props.logout()}>Logout</button>
      </>
    ) : (
      <>
        <button onClick={this.openModal("signup")}>Signup</button>
        <button onClick={this.openModal("login")}>Login</button>
      </>
    )

    return (
      <header className="site-header">
        <div className="content">
          <Link to="/">
            <figure>
              <img 
                className="logo"
                src={unfilledLogo} alt="Postcard Logo"/>
              <img 
                className="logo"
                src={filledLogo} alt="Postcard Logo"/>
            </figure>
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