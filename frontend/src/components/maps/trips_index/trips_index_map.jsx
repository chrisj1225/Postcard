import React from 'react';
import GoogleMapReact from 'google-map-react';
import { limitChars } from '../../../util/func_util';
import { attachAllTripPos, averagePos } from '../../../util/selectors';
import redMarker from '../../../assets/images/spotlight-poi2red.png';
import greenMarker from '../../../assets/images/spotlight-poi2green.png';
import { MAPS_API_KEY } from '../../../util/credentials';


class TripsIndexMap extends React.Component {
  constructor(props) {
    super(props);

    this.markers = [];
    this.trips = [];
    this.tripsWithPos = attachAllTripPos(props.trips, props.postcards);
    
    let { lat, lng } = averagePos(this.tripsWithPos);
    if (!lat || !lng) [lat, lng] = [40.711457884430985, -74.00372005691278];
    
    this.center = { lat, lng };
    this.zoom = 0;
    this.activeMarker = null;
  }

  componentWillUnmount() {
    this.markers.forEach(marker => {
      this.maps.event.clearInstanceListeners(marker);
    });
    let tripItems = document.getElementsByClassName("trips-index-item");
    tripItems = Array.from(tripItems);
    
    tripItems.forEach(tripItem => {
      tripItem.removeEventListener("mouseenter", () => true);
      tripItem.removeEventListener("mouseleave", () => true);
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
          id: `trip-marker-${trip._id}`,
        });
        this.markers.push(marker);
        let desc;
        const limit = 20;
        if (trip.description.length > limit) {
          desc = limitChars(trip.description, limit);
        } else {
          desc = trip.description;
        }

        // setting up interactive events
        const content =
          '<div id="index-info-content-wrapper">' +
          '<h1 class="trip-title-info">' +
          `${trip.title}` + '</h1>' +
          '<p class="trip-desc-info">' +
          `${desc}` + '</p>' +
          '</div>';

        // create infowindow for the markers
        const infoWindow = new this.maps.InfoWindow({
          content
        });
        
        // event listener for hovering the markers
        marker.addListener("mouseover", e => {
          this.markers.forEach(m => m.setIcon(redMarker));
          marker.setIcon(greenMarker);
          infoWindow.open(map, marker);
          const tripItem = document.getElementById(`trip-item-${trip._id}`);
          tripItem.scrollIntoView({ behavior: "smooth", block: "center" });
          tripItem.classList.add("focused");
        });
        marker.addListener("mouseout", e => {
          infoWindow.close();
          const tripItem = document.getElementById(`trip-item-${trip._id}`);
          tripItem.classList.remove("focused");
        });
        
        // event listener for clicking the marker
        marker.addListener("click", e => {
          this.props.history.push(`/trips/${trip._id}`);
        });


        // event listeners for hovering the trips list item
        const tripItem = document.getElementById(`trip-item-${trip._id}`)
        tripItem?.addEventListener("mousedown", () =>{
          
          if (this.activeMarker === marker) {
            tripItem?.classList.remove("focused");
            this.activeMarker?.setAnimation(null);
            this.map?.setZoom(0);
            this.activeMarker?.setIcon(redMarker);
            this.activeMarker = null;
            return;
          } else {
            if (!this.activeMarker) {
              this.activeMarker = marker;
              tripItem.classList.add("focused");
            } else {
              const item = document.querySelectorAll(".trips-index-item.focused")[0];
              if (item) item?.classList.remove("focused");
              this.activeMarker?.setIcon(redMarker);
              this.activeMarker?.setAnimation(null);
              this.activeMarker = marker;
              tripItem?.classList.add("focused");
            }
          }
          let lat, lng, position;
          lat = this.activeMarker?.position.lat();
          lng = this.activeMarker?.position.lng();
          position = { lat,lng }
          this.map?.panTo(position);
          if (this.center !== position) {
            this.center = position;
            setTimeout(() => {
              this.map?.setZoom(6);
            }, 200);
          } else {
            this.map?.setZoom(6);
          }
          
          this.activeMarker?.setIcon(greenMarker);
          this.activeMarker?.setAnimation(this.maps.Animation.BOUNCE);
        });

        // document.getElementById(`trip-item-${trip._id}`).addEventListener("mouseleave", () =>{
        //   marker.setAnimation(null);
        //   this.map.setZoom(0);
        // });

        // add the marker to the array after we're done with it
        this.markers.push(marker);
      });
    }
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
          bootstrapURLKeys={{ key: MAPS_API_KEY, libraries:'places' }}
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