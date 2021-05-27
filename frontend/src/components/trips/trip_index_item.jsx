import React from 'react'; 
import { Link } from 'react-router-dom'; 

const TripIndexItem = ({ trip }) => {

  debugger

  return (
    <div className="trips-index-item" id={`trip-item-${trip._id}`}>
      <section>
        <Link to={`trips/${trip._id}`}>
          <h2>{trip.title}</h2>
        </Link>
        <p>{trip.description}</p>
      </section>
      <div>
        <ul role="list">
          {/* images */}
          <li>{trip.photoTiles[0] ? ( <img src={trip.photoTiles[0]} alt={"Postcard photo tile"}/> ) : null}</li>
          <li>{trip.photoTiles[1] ? ( <img src={trip.photoTiles[1]} alt={"Postcard photo tile"}/> ) : null}</li>
          <li>{trip.photoTiles[2] ? ( <img src={trip.photoTiles[2]} alt={"Postcard photo tile"}/> ) : null}</li>
          <li>{trip.photoTiles[3] ? ( <img src={trip.photoTiles[3]} alt={"Postcard photo tile"}/> ) : null}</li>
        </ul>
      </div>
    </div>
  )
  
}

export default TripIndexItem; 