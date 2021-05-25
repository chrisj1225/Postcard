import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props)

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
          <h1 className="logo">
            Postcard
          </h1>
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