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
        <h2>Postcard Title</h2>
        <p>{ limitChars("Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ullam perferendis voluptatem debitis nostrum voluptate quibusdam et? Suscipit, velit neque ea totam nemo laborum, itaque, similique odit quidem nobis omnis?", 215)}</p>
      </article>
      <aside>
        <p>80.654651651, -45.198151651</p>
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