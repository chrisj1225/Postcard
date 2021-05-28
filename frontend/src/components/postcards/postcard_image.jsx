import React from 'react'; 

const PostcardImage = ({ imageUrl, active, toggleActive, idx, deletePostcardPhoto }) => {
  const renderActive = parseInt(active) === idx; 

  return (
    <li className="postcard-image-item-wrapper">
      <figure onClick={deletePostcardPhoto} id={imageUrl}><span>&#10005;</span></figure>
      <div className={renderActive ? "active" : ''} onClick={toggleActive} id={idx}>
        <img src={imageUrl} alt="postcard image" className="postcard-image"/>
      </div>
    </li>
  )

}; 

export default PostcardImage; 