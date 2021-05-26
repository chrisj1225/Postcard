import React from 'react'; 
import { limitChars } from '../../util/func_util'; 

const PostcardsIndexItem = (props) => {
  const { postcard } = props; 

  return (
    <div className="postcard-index-item">Postcard Index Item
      {/* <h2>{postcard.title}</h2>
      <p>{limitChars(postcard.body, 120)}</p>
      <img src={postcard.imageUrl} alt=""/> */}
    </div>
  )
}; 

export default PostcardsIndexItem; 