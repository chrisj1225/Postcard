import React from 'react';
import GoogleMapReact from 'google-map-react';
import { limitChars } from '../../../util/func_util';
import { attachAllTripPos } from '../../../util/selectors';
import redMarker from '../../../assets/images/spotlight-poi2red.png';
import greenMarker from '../../../assets/images/spotlight-poi2green.png';


class TripsIndexMap extends React.Component {
  constructor(props) {
    super(props);
    this.idMarkers = this.idMarkers.bind(this);

    this.markers = [];
    this.trips = [];
    this.tripsWithPos = attachAllTripPos(this.props.trips, this.props.postcards);
    
    const lat = 23.68437587797855;
    const lng = -3.202092257879451;
    this.center = { lat, lng };
    this.zoom = 0;
  }

  componentWillUnmount() {
    this.markers.forEach(marker => {
      this.maps.event.clearInstanceListeners(marker);
    });
  }

  handleApiLoaded(map, maps) {
    this.map = map;
    this.maps = maps;

    if (this.tripsWithPos.length) {

      this.tripsWithPos.forEach(trip => {
        
        // if the trip has no postcards, la-lng are > 180 and so don't continue
        if (trip.lat > 180 || trip.lng > 180) return;
        
        this.trips.push(trip);
        
        // set up marker on map
        const position = { lat: trip.lat, lng: trip.lng };
        const marker = new maps.Marker({
          position,
          map,
          animation: maps.Animation.DROP,
          optimized: false,
          icon: redMarker,
          id: `marker-${trip._id}`,
        });
        this.markers.push(marker);


        // setting up interactive events
        const content =
          '<div id="index-info-content-wrapper">' +
          '<h1 class="trip-title-info">' +
          `${trip.title}` + '</h1>' +
          '<p class="trip-desc-info">' +
          `${trip.description}` + '</p>' +
          '</div>';

        const infoWindow = new this.maps.InfoWindow({
          content
        });
        marker.addListener("mouseover", e => {
          infoWindow.open(map, marker);
          const tripItem = document.getElementById(`trip-item-${trip._id}`);
          tripItem.classList.add("focused");
        });
        marker.addListener("mouseout", e => {
          infoWindow.close();
          const tripItem = document.getElementById(`trip-item-${trip._id}`);
          tripItem.classList.remove("focused");
        });
        marker.addListener("click", e => {
          this.props.history.push(`/trips/${trip._id}`);
        });

        document.getElementById(`trip-item-${trip._id}`).addEventListener("mouseenter", () =>{
          this.markers.forEach(m => m.setIcon(redMarker));
          marker.setIcon(greenMarker);
          marker.setAnimation(this.maps.Animation.BOUNCE);
        });

        document.getElementById(`trip-item-${trip._id}`).addEventListener("mouseleave", () =>{
          marker.setAnimation(null);
        });

        this.markers.push(marker);
        return true;
      });
      

      // creates a layer to hold all the markers
      const overlay = new maps.OverlayView();
      overlay.draw = function() {
        this.getPanes().markerLayer.id='marker-layer';
      };
      overlay.setMap(map);
      setTimeout(this.idMarkers, 200);
    }
  }

  idMarkers() {
    const markerImgs = document.querySelectorAll("#marker-layer img");
    this.trips.forEach((trip, i) => markerImgs[i].id = `trip-${trip._id}`);
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
      <div className="trips-index map-wrapper">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
          defaultCenter={ this.center }
          defaultZoom={ this.zoom }
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