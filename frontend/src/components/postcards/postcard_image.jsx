import React from 'react'; 

const PostcardImage = ({ imageUrl, active, toggleActive, idx, deletePostcardPhoto, isUsers, prevImg, nextImg }) => {
  const renderActive = parseInt(active) === idx; 

  return (
    <li className="postcard-image-item-wrapper">
      <div className={renderActive ? "active" : ''} onClick={toggleActive} id={idx}>
        { isUsers ? <figure onClick={deletePostcardPhoto} id={imageUrl}><span>&#10005;</span></figure> : null }
        <img src={imageUrl} alt="postcard image" className="postcard-image"/>
        <p className="close-btn">close</p>
      </div>
    </li>
  )

}; 

export default PostcardImage; 