import React from 'react'; 
import { Link } from 'react-router-dom'; 

import PostcardImage from './postcard_image'; 
import PostcardShowMap from '../maps/postcard_show/postcard_show_map';

class PostcardShow extends React.Component{
  constructor(props){
    super(props); 

    this.state = {
      files: "",
      active: null, 
      imgUrls: [], 
      btnDisabled: true, 
    }
    
    this.nextImg = this.nextImg.bind(this); 
    this.prevImg = this.prevImg.bind(this); 
    this.toggleActive = this.toggleActive.bind(this); 
    this.uploadImages = this.uploadImages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deletePostcard = this.deletePostcard.bind(this);
    this.handleDeletePostcardPhoto = this.handleDeletePostcardPhoto.bind(this); 
  }

  componentDidMount() {
    this.props.fetchPostcard(this.props.postcardId)
  }

  toggleActive(e) {
    if (e.currentTarget.id === this.state.active) {
      this.setState({active: null}); 
    } else {
      // e.currentTarget.id is an imageUrl
      this.setState({active: e.currentTarget.id}); 
    }
  }

  nextImg(imgUrl) {
    return (e) => {
      e.stopPropagation(); 
      const { photos } = this.props.postcard; 
      
      const idx = photos.indexOf(imgUrl); 
      return photos[ (idx + 1) % photos.length ]; 
    }
  }
  
  prevImg(imgUrl) {
    return (e) => {
      e.stopPropagation(); 
      
      const { photos } = this.props.postcard; 
      
      const idx = photos.indexOf(imgUrl); 
      return photos[ (idx - 1 + photos.length) % photos.length ]; 
    }
  }

  handleChange(e) {
    const files = e.target.files; 
    this.setState({ imgUrls: [] })

    let numImgsLeft = files.length + this.props.postcard.photos.length; 

    if (numImgsLeft > 8) {
      this.setState({ errors: ["Postcards can only hold 8 images"] })
    }

    // IMAGE PREVIEWS
    for (let i = 0; i < files.length; i++) {
      if (numImgsLeft >= 8) {
        break; 
      }
      numImgsLeft += 1; 

      let file = files[i];
      
      let fileReader = new FileReader(); 
      fileReader.onloadend = () => {
        this.setState({ imgUrls: [...this.state.imgUrls, fileReader.result] }) 
      }   
      
      fileReader.readAsDataURL(file)
    }

    this.setState({ files, btnDisabled: false }); 
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

    this.props.updatePostcardPhotos(this.props.postcardId, formData).then(
      () => this.setState({ imgUrls: [] }),
      () => this.setState({ imgUrls: [] })
    );
  }

  handleDeletePostcardPhoto(e) {
    e.stopPropagation(); 
    const { deletePostcardPhoto } = this.props; 

    const response = window.confirm("Are you sure you want to delete this photo?")

    if (response) {
      deletePostcardPhoto(this.props.postcard._id, { imageUrl: e.currentTarget.id })
    }
  }




  render() {
    const { postcard, currentUser } = this.props; 
    const { imgUrls, btnDisabled } = this.state; 

    if (!postcard) return null; 
    
    let imageUpload;
    let editPostcardLink;
    let deletePostcardButton;
    let imgPreviews; 
    const isUsers = !!currentUser && currentUser.id === postcard.travellerId; 

    if (isUsers) {
      imageUpload = (
        <form onSubmit={this.uploadImages} encType="multipart/form-data" >
          <div> {/* upload-box */}
            <input type="file" multiple
              onChange={this.handleChange} />
            <button type="submit">Upload</button>
          </div>
        </form>
      );
        
      const firstImgPreview = imgUrls.length ? (
        <img 
          src={imgUrls[0]} 
          alt="img preview" 
          className="img-preview"/> 
      ) : null; 

      imgPreviews = imgUrls.length > 1 ? (
        imgUrls.slice(1).map(imgUrl => (
          <li className="postcard-image-item-wrapper img-preview-wrapper">
            <div>
              <img src={imgUrl} alt="image preview" className="img-preview"/>
            </div>
          </li>
        ))
      ) : null;

      imageUpload = (
        <form 
          onSubmit={this.uploadImages} 
          encType="multipart/form-data" 
          className="upload-image-form"
          >
          <label htmlFor="photo"
            onDragOver={this.handleDragOver}
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragLeave}
            onDrop={this.handleDrop}
          >
            { firstImgPreview }
            <span>Add Photos</span>
            <input type="file" name='photo' id='photo' multiple
              onChange={this.handleChange} />
          </label>
          <button 
            type="submit" 
            className={btnDisabled ? "disabled" : "active"}
          >Upload</button>
        </form>
      )

      editPostcardLink = <Link className="edit-postcard" to={`/postcards/${postcard._id}/edit`}>Edit Postcard</Link>; 

      deletePostcardButton = (
        <a onClick={this.deletePostcard}
          className="delete-postcard">Delete Postcard</a>
      );
    }

    const errors = this.state.errors ? (
      <ul role="list" className="errors">
        {
          this.state.errors.map(err => (
            <li>{err}</li>
          ))
        }
      </ul>
    ) : null; 

    const imageComponents = this.props.postcard.photos.length < 8 ? (
      <>
        { imageUpload }
        { imgPreviews }
      </>
    ) : null; 



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
        { errors }
        <main>
          <ul role="list">
            { postcard.photos.map((imageUrl, i) => (
              <PostcardImage 
                key={i} 
                idx={i}
                imageUrl={imageUrl} 
                toggleActive={this.toggleActive} 
                active={this.state.active}
                deletePostcardPhoto={this.handleDeletePostcardPhoto}
                isUsers={isUsers}
                nextImg={this.nextImg}
                prevImg={this.prevImg}
                />
            )) }
            { imageComponents }
          </ul>
        </main>
      </div>
    )
  }
}


export default PostcardShow; 