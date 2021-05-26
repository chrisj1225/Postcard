import React from 'react'; 
import { limitChars } from '../../util/func_util'; 

// TESTING
import stamp from '../../assets/images/blue-stamp.png'

const PostcardsIndexItem = (props) => {
  const { postcard, arrow } = props; 

  return (
    <div className="postcard-index-item">
      {/* test data */}
      <article>
        <h2>{postcard.title}</h2>
        <p>{ limitChars(postcard.body, 215)}</p>
      </article>
      <aside>
        <p>{postcard.lat.$numberDecimal}, {postcard.lng.$numberDecimal}</p>
        <img src={stamp} alt=""/>
      </aside>
      { arrow }

      {/* <h2>{postcard.title}</h2>
      <p>{limitChars(postcard.body, 120)}</p>
      <img src={postcard.imageUrl} alt=""/> 
      { `${postcard.pos.lat}, ${postcard.pos.lng}` }
      */}
    </div>
  )
}; 

export default PostcardsIndexItem; 