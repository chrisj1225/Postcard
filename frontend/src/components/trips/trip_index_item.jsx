import React from 'react'; 
import { Link } from 'react-router-dom'; 

const TripIndexItem = ({ trip }) => {


  return (
    <div className="trips-index-item">
      <section>
        <Link to={`trips/${trip.id}`}>
          <h2>{trip.title}</h2>
        </Link>
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