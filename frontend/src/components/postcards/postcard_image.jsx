import React from 'react'; 

const PostcardImage = ({ imageUrl }) => {
  debugger
  return(
    <li className="postcard-image-item-wrapper">
      <div>
        <img src={imageUrl} alt="postcard image" className="postcard-image"/>
      </div>
    </li>
  )
}; 

export default PostcardImage; 