import React from 'react'; 

const TripIndexItem = ({ trip }) => {


  return (
    <div className="trips-index-item">
      <section>
        <h2>{trip.title}</h2>
        <p>{trip.description}</p>
      </section>
      <div>
        <ul role="list">
          {/* images */}
          {/* <li><img src="" alt=""/></li> */}
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
  
}

export default TripIndexItem; 