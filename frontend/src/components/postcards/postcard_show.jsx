import React from 'react'; 
import { Link } from 'react-router-dom'; 


import PostcardShowMapContainer from '../maps/postcard_show/postcard_show_map_container';
import PostcardImage from './postcard_image'; 

class PostcardShow extends React.Component{
  constructor(props){
    super(props); 

    this.state = { active: null }

    this.toggleActive = this.toggleActive.bind(this); 
  }

  componentDidMount() {
    this.props.fetchPostcard(this.props.postcardId)
  }

  toggleActive(e) {
    if (e.currentTarget.id === this.state.active) {
      this.setState({active: null}); 
    } else {
      this.setState({active: e.currentTarget.id}); 
    }
  }

  render() {
    const { postcard } = this.props; 

    if (!postcard) return null; 

    return (
      <div className="postcard-show-wrapper">
        <header>
          <section>
            <Link to={`/trips/${postcard.tripId}`}>Back to trip overview</Link>
            <h1>{postcard.title}</h1>
            <p>{postcard.body}</p>
          </section>
          <aside>
            { <PostcardShowMapContainer postcard={postcard} /> }
          </aside>
        </header>
        <main>
          <ul role="list">
            { postcard.photos.map((imageUrl, i) => (
              <PostcardImage 
                key={i} 
                idx={i}
                imageUrl={imageUrl} 
                toggleActive={this.toggleActive} 
                active={this.state.active}/>
            )) }
          </ul>
        </main>
      </div>
    )
  }
}


export default PostcardShow; 