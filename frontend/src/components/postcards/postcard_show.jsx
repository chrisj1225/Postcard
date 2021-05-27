import React from 'react'; 
import { Link } from 'react-router-dom'; 

import PostcardImage from './postcard_image'; 
import PostcardShowMap from '../maps/postcard_show/postcard_show_map';

class PostcardShow extends React.Component{
  constructor(props){
    super(props); 

    this.state = {
      files: "",
      active: null
    }
    
    this.toggleActive = this.toggleActive.bind(this); 
    this.uploadImages = this.uploadImages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deletePostcard = this.deletePostcard.bind(this);
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

  handleChange(e) {
    this.setState({
      files: e.target.files
    })
  }

  deletePostcard() {
    this.props.deletePostcard(
      this.props.postcard.tripId, 
      this.props.postcardId)
      .then(this.props.history.push(`/trips/${this.props.postcard.tripId}`));
  }

  uploadImages(e) {
    e.preventDefault();
    let formData = new FormData();

    for (const file of this.state.files) {
      formData.append("images", file);
    }

    this.props.updatePostcardPhotos(this.props.postcardId, formData);
  }

  render() {
    const { postcard, currentUser } = this.props; 

    if (!postcard) return null; 

    // debugger
    let imageUpload;
    let editPostcardLink;
    let deletePostcardButton;
    if ((currentUser) && (currentUser.id === postcard.travellerId)) {
      imageUpload = (
        <form onSubmit={this.uploadImages} encType="multipart/form-data" >
          <div> {/* upload-box */}
            <input type="file" multiple
              onChange={this.handleChange} />
            <button type="submit">Upload</button>
          </div>
        </form>
      );

      editPostcardLink = <Link className="edit-postcard" to={`/postcards/${postcard._id}/edit`}>Edit Postcard</Link>

      deletePostcardButton = (
        <a onClick={this.deletePostcard}
          className="delete-postcard">Delete Postcard</a>
      );
    }
    
    return (
      <div className="postcard-show-wrapper">
        <header>
          <section>
            <Link to={`/trips/${postcard.tripId}`}>Back to trip overview</Link>
            {editPostcardLink}
            {deletePostcardButton}
            <h1>{postcard.title}</h1>
            <p>{postcard.body}</p>
          </section>
          <aside>
            { <PostcardShowMap postcard={postcard} /> }
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
          { imageUpload }
        </main>
      </div>
    )
  }
}


export default PostcardShow; 