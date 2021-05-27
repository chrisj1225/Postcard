import React from 'react'; 

class PostcardImage extends React.Component {
  constructor(props) {
    super(props); 

    this.state = { active: false }; 

    // this.toggleActive = this.toggleActive.bind(this); 
  }

  // toggleActive() {
  //   this.setState({active: !this.state.active}); 
  // }

  render() {
    const { imageUrl, active, toggleActive, idx } = this.props; 
    const renderActive = parseInt(active) === idx; 

    return (
      <li className="postcard-image-item-wrapper">
        <div className={renderActive ? "active" : ''} onClick={toggleActive} id={idx}>
          <img src={imageUrl} alt="postcard image" className="postcard-image"/>
        </div>
      </li>
    )
  }
}; 

export default PostcardImage; 