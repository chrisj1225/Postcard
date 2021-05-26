import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { limitChars } from '../../../util/func_util';
import redMarker from '../../../assets/images/spotlight-poi2red.png'
import greenMarker from '../../../assets/images/spotlight-poi2green.png'

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
    this.idMarkers = this.idMarkers.bind(this);

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

  componentWillUnmount() {
    this.markers.forEach(marker => {
      this.maps.event.clearInstanceListeners(marker);
    });
  }

  handleApiLoaded(map, maps) {
    this.map = map;
    this.maps = maps;
    this.markerPopups = [];
    this.markers = [];

    this.map.addListener("click", e => {
      if (this.placedMarker) this.placedMarker.setMap(null);
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const clickPosition = { lat, lng };
      this.placedMarker = new this.maps.Marker({
        position: clickPosition,
        map: this.map,
        icon: greenMarker,
        animation: maps.Animation.DROP,
      });
      this.props.handlePositionInput(clickPosition);
    });

    const input = document.getElementById("cpf-search");
    const searchBox = new this.maps.places.SearchBox(input);
    this.map.controls[this.maps.ControlPosition.TOP_CENTER].push(input);
    this.map.addListener("bounds_changed", () => {
      searchBox.setBounds(this.map.getBounds());
    });

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      if (this.placedMarker) this.placedMarker.setMap(null);

      const bounds = new this.maps.LatLngBounds();
      places.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = greenMarker;
        
        this.placedMarker = new this.maps.Marker({
            map,
            icon,
            position: place.geometry.location,
            title: place.name,
        });

        const lat = this.placedMarker.position.lat();
        const lng = this.placedMarker.position.lng();
        this.props.handlePositionInput({ lat, lng });

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      })
      this.map.fitBounds(bounds);
    });

    // this.positions will become this.props.trips

    // this.markers = this.props.trips.map(trip => {
    // this.positions.forEach((position, i) => {
    //   // const position = { lat: trip.lat, lng: trip.lng };
    //   const marker = new maps.Marker({
    //     position,
    //     map,
    //     animation: maps.Animation.DROP,
    //     optimized: false,
    //     icon: redMarker,
      // });
      // marker.addListener("mouseover", e => {
      //   const popup = document.getElementById("marker-popup");
      //   popup.classList.add("active");
      //   popup.style.top = e.domEvent.relatedTarget.y - 55 + "px";
      //   popup.style.left = e.domEvent.relatedTarget.x - 40 + "px";
      //   // const title = document.querySelector("#marker-popup > h3");
      //   // const desc = document.querySelector("#marker-popup > p");
      //   // title.textContent = `${trip.title}`;
      //   // desc.textContent = `${limitChars(trip.description, 20)}`;
      //   popup.textContent = `${marker.position.lat().toString().slice(0,7)},${marker.position.lng().toString().slice(0,7)}`;
      // });
      // marker.addListener("mouseout", e => {
      //   document.getElementById("marker-popup").classList.remove("active");
      // });
      // marker.addListener("click", e => {
      //   this.props.history.push("/trips");
      // });
      // this.markers.push(marker);
    // });
    
    // const overlay = new maps.OverlayView();
    // overlay.draw = function() {
    //   this.getPanes().markerLayer.id='marker-layer';
    // };
    // overlay.setMap(map);
    // setTimeout(this.idMarkers, 200);
  }

  idMarkers() {
    // const markerImgs = document.querySelectorAll("#marker-layer img");
    // this.positions.forEach((position, i) => markerImgs[i].id = `trip-${i}`);
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

  // click() {
  //   const test = document.getElementById("trip-0");
  //   if (test) {
  //     console.log(test);
  //     test.classList.add("focused");
  //     test.src = greenMarker;
  //   }
  // }

  render() {

    return (
      <div className="trips-index map-wrapper" style={{ width: "1000px", height: "500px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY, libraries:['places'] }}
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