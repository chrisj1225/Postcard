import React from 'react'; 
import { Link } from 'react-router-dom'; 


import PostcardShowMap from '../maps/postcard_show/postcard_show_map';

// import PostcardImage from './postcard_image'; 

class PostcardShow extends React.Component{
  constructor(props){
    super(props); 

  }

  componentDidMount() {
    this.props.fetchPostcard(this.props.postcardId)
  }

  render() {
    const { postcard } = this.props; 

    if (!postcard) return null; 

    // 
    return (
      <div className="postcard-show-wrapper">
        <header>
          <section>
            <Link to={`/trips/${postcard.tripId}`}>Back to trip overview</Link>
            <h1>{postcard.title}</h1>
            <p>{postcard.body}</p>
          </section>
          <aside>
            { <PostcardShowMap postcard={postcard} /> }
          </aside>
        </header>
        <main>
          {/* { postcard.images.map((imageUrl, i) => <PostcardImage key={i} imageUrl={imageUrl} />) } */}
        </main>
      </div>
    )
  }
}


export default PostcardShow; 