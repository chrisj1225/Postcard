import React from 'react'; 
import { Link } from 'react-router-dom'; 

import { limitChars } from '../../util/func_util'; 

// TESTING
import stamp from '../../assets/images/blue-stamp.png'

const PostcardsIndexItem = (props) => {
  const { postcard, arrow } = props; 

  // debugger
  return (
    <div className="postcard-index-item">
      <article>
        <Link to={`/postcards/${postcard._id}`}>
          <h2>{postcard.title}</h2>
        </Link>
        <p>{ limitChars(postcard.body, 215)}</p>
      </article>
      <aside>
        <p>{
          limitChars(postcard.lat.$numberDecimal, 14)
        }, {
          limitChars(postcard.lng.$numberDecimal, 14)
        }</p>
        <img src={postcard.photos[0] || stamp} alt="Postcard image"/> 
      </aside>
      { arrow }

    </div>
  )
}; 

export default PostcardsIndexItem; 