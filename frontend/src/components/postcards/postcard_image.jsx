import React from 'react'; 

const PostcardImage = ({ imageUrl, active, toggleActive, idx, deletePostcardPhoto, isUsers, prevImg, nextImg }) => {
  const renderActive = parseInt(active) === idx;

  return (
    <li className="postcard-image-item-wrapper">
      <div className={renderActive ? "image-item active" : 'image-item'} onClick={toggleActive} id={idx}>
        { isUsers ? <figure onClick={deletePostcardPhoto} className={ renderActive ? "hidden" : "" } id={imageUrl}><span>&#10005;</span></figure> : null }
        <div className={ `image-wrapper${renderActive ? " absolute" : ""}` }>
          <div className={ `image-wrapper${renderActive ? " relative" : ""}` }>
            <img src={imageUrl} alt="postcard image" className={ `postcard-image${renderActive ? " active" : ""}` }/>
            <h3 className="close-btn">close</h3>
          </div>
        </div>
        
      </div>
    </li>
  )

}; 

export default PostcardImage; 