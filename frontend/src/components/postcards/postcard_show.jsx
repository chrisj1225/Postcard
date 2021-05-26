import React from 'react'; 

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

    return (
      <div>Postcard Show Page
        <h1>{postcard.title}</h1>
        <p>{postcard.body}</p>
        {/* { postcard.images.map((imageUrl, i) => <PostcardImage key={i} imageUrl={imageUrl} />) } */}
      </div>
    )
  }
}


export default PostcardShow; 