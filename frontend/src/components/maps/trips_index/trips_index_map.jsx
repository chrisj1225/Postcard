import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';

const randPos = (lt, lg) => {
  let lat, lng;
  const either = [-1, 1];
  lat = lt + Math.random()*5*either[Math.floor(Math.random()*2)];
  lng = lg + Math.random()*5*either[Math.floor(Math.random()*2)];
  return { lat, lng };
}

class TripsIndexMap extends React.Component {
  constructor(props) {
    super(props);

    this.markers = [];

    const lat = 23.68437587797855;
    const lng = -3.202092257879451;

    this.positions = [];

    for (let i = 0; i < 10; i++) { this.positions.push(randPos(lat, lng)) }

    // expect to receive Trip objects as an array.
      // make Markers from Trip objects using their first lat/lng coords
    

    // this will be the default position and zoom the map centers on
    this.state = {
      center: {
        lat: lat,
        lng: lng
      },
      zoom: 0,
    }
  }

  componentDidMount() {
    // this.props.fetchTrips(); ?
  }

  handleApiLoaded(map, maps) {
    // can do stuff with map or maps here like make markers
    this.map = map;
    this.maps = maps;
    this.markerPopups = [];
    

    this.markers = this.positions.map(position => {
      return new maps.Marker({ position, map });
    });

    this.markers.forEach((marker,i) => {
      marker.addListener("mouseover", e => {
        const popup = document.getElementById("marker-popup");
        popup.classList.add("active");
        popup.style.top = e.domEvent.relatedTarget.y - 55 + "px";
        popup.style.left = e.domEvent.relatedTarget.x - 37 + "px";
        popup.textContent = `${marker.position.lat().toString().slice(0,7)},${marker.position.lng().toString().slice(0,7)}`;
      });
      marker.addListener("mouseout", e => {
        document.getElementById("marker-popup").classList.remove("active");
      })
    });
    
  }

  createMapOptions(maps) {
    return {
      mapTypeControl: false,
      mapId: "aec3b550b10428f9",
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: false,
    }
  }

  render() {

    return (
      <div className="trips-index map-wrapper" style={{ width: "1000px", height: "400px" }}>
        <div id="marker-popup" className="marker-info-wrapper">
          <p></p>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
          defaultCenter={ this.state.center }
          defaultZoom={ this.state.zoom }
          yesIWantToUseGoogleMapApiInternals={ true }
          onGoogleApiLoaded={ ({ map, maps }) => this.handleApiLoaded(map, maps) }
          options={ this.createMapOptions }
        >
          
        </GoogleMapReact>
      </div>
    );
  }
}

export default TripsIndexMap;