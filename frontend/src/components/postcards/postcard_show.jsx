import React from 'react'; 
import { Link } from 'react-router-dom'; 


import PostcardShowMapContainer from '../maps/postcard_show/postcard_show_map_container';

// import PostcardImage from './postcard_image'; 

class PostcardShow extends React.Component{
  constructor(props){
    super(props); 

    this.state = {
      files: ""
    }

    this.uploadImages = this.uploadImages.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchPostcard(this.props.postcardId)
  }

  handleChange(e) {
    this.setState({
      files: e.target.files
    })
  }

  uploadImages(e) {
    e.preventDefault();
    let formData = new FormData();

    for (const file of this.state.files) {
      formData.append("images", file);
    }
    debugger
    this.props.updatePostcardPhotos(this.props.postcardId, formData);

  }

  render() {
    const { postcard } = this.props; 

    if (!postcard) return null; 

    // debugger
    const imageUpload = (
      <form onSubmit={this.uploadImages} encType="multipart/form-data" >
        <div> {/* upload-box */}
          <input type="file" multiple
            onChange={this.handleChange} />
          <button type="submit">Upload</button>
        </div>
      </form>
    )

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
          {/* { postcard.images.map((imageUrl, i) => <PostcardImage key={i} imageUrl={imageUrl} />) } */}
          {imageUpload}
        </main>
      </div>
    )
  }
}


export default PostcardShow; 