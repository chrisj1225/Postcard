import React from 'react'; 
import { Link } from 'react-router-dom'; 

import { limitChars } from '../../util/func_util'; 

// TESTING
import stamp from '../../assets/images/blue-stamp.png'

const PostcardsIndexItem = (props) => {
  const { postcard, arrow } = props; 
  return (
    <div className="postcard-index-item" id={`postcard-item-${postcard._id}`}>
      {/* test data */}
      <article>
        <Link to={`/postcards/${postcard._id}`}>
          <h2>{postcard.title}</h2>
        </Link>
        <p>{ limitChars(postcard.body, 215)}</p>
      </article>
      <aside>
        <p>{postcard.lat.$numberDecimal}, {postcard.lng.$numberDecimal}</p>
        <img src={postcard.photos.imageUrl || stamp} alt="Postcard image"/> 
      </aside>
      { arrow }

    </div>
  )
}; 

export default PostcardsIndexItem; 