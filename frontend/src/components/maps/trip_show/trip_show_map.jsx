import React from 'react';
import GoogleMapReact from 'google-map-react';
import { limitChars } from '../../../util/func_util';
import { attachTripPos } from '../../../util/selectors';
import redMarker from '../../../assets/images/spotlight-poi2red.png';
import greenMarker from '../../../assets/images/spotlight-poi2green.png';
import { MAPS_API_KEY } from '../../../util/credentials';


class TripShowMap extends React.Component {
  constructor(props) {
    super(props);

    this.markers = [];

    let lat, lng;
    this.tripWithPos = attachTripPos(this.props.trip, this.props.postcards);
    if (this.tripWithPos.lat > 180 || this.tripWithPos.lng > 180) {
      lat = 40.78054494676642;
      lng = -73.96702023848366;
    } else {
      lat = this.tripWithPos.lat;
      lng = this.tripWithPos.lng;
    }
    const postcards = Object.values(Object.assign({}, this.props.postcards));
    this.postcards = postcards.filter(postcard => postcard.tripId === this.props.trip._id);
    this.center = { lat, lng };
    this.zoom = 8;
  }

  componentWillUnmount() {
    this.markers.forEach(marker => {
      this.maps.event.clearInstanceListeners(marker);
    });
    let postcardItems = document.getElementsByClassName("postcard-index-item");
    postcardItems = Array.from(postcardItems);
    postcardItems.forEach(postcardItem => {
      postcardItem.removeEventListener("mouseenter", () => true);
      postcardItem.removeEventListener("mouseleave", () => true);
    });

  }

  handleApiLoaded(map, maps) {
    this.map = map;
    this.maps = maps;
    this.bounds = new this.maps.LatLngBounds();

    if (this.postcards.length) {

      this.postcards.forEach(postcard => {

        if (
          parseFloat(postcard.lat.$numberDecimal) > 180 || 
          parseFloat(postcard.lng.$numberDecimal) > 180
          ) return;

        const position = {
          lat: parseFloat(postcard.lat.$numberDecimal),
          lng: parseFloat(postcard.lng.$numberDecimal)
        };

        // add position to bounds
        this.bounds.extend(position);

        // create marker
        const marker = new maps.Marker({
          position,
          map,
          animation: maps.Animation.DROP,
          optimized: false,
          icon: redMarker,
        });
        

        // event listener for hovering the markers

        marker.addListener("mouseover", e => {
          this.markers.forEach(m => m.setIcon(redMarker));
          marker.setIcon(greenMarker);
          const postcardItem = document.getElementById(`postcard-item-${postcard._id}`);
          postcardItem.scrollIntoView({ behavior: "smooth", block: "center" });
          postcardItem.classList.add("focused");
        });
        marker.addListener("mouseout", e => {
          const postcardItem = document.getElementById(`postcard-item-${postcard._id}`);
          postcardItem.classList.remove("focused");
        });
        
        // event listener for clicking the marker
        marker.addListener("click", e => {
          this.props.history.push(`/postcards/${postcard._id}`);
        });

        // event listeners for hovering the trips list item
        document.getElementById(`postcard-item-${postcard._id}`).addEventListener("mouseenter", () =>{
          if (this.postcards.length === 1) {
            this.map.setZoom(15);
          } else {
            this.map.fitBounds(this.bounds);
          }
          let lat, lng;
          lat = marker.position.lat();
          lng = marker.position.lng();
          this.map.panTo({ lat,lng })
          this.markers.forEach(m => m.setIcon(redMarker));
          marker.setIcon(greenMarker);
          marker.setAnimation(this.maps.Animation.BOUNCE);
        });

        document.getElementById(`postcard-item-${postcard._id}`).addEventListener("mouseleave", () =>{
          marker.setAnimation(null);
          if (this.postcards.length === 1) this.map.setZoom(15);
        });

        ///////////////////////////////////////////////////////

        // add marker to state markers
        this.markers.push(marker);
      });

      this.map.fitBounds(this.bounds);
      if (this.postcards.length === 1) this.map.setZoom(15);
      
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
      <div className="trip-show map-wrapper">
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

export default TripShowMap;