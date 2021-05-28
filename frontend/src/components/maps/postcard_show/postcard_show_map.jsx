import React from 'react';
import GoogleMapReact from 'google-map-react';
import greenMarker from '../../../assets/images/spotlight-poi2green.png';
import { MAPS_API_KEY } from '../../../util/credentials';

class PostcardShow extends React.Component {
  constructor(props) {
    super(props);
    this.postcard = props.postcard;
    let lat, lng;
    lat = parseFloat(this.postcard.lat.$numberDecimal);
    lng = parseFloat(this.postcard.lng.$numberDecimal);
    if (lat > 180 || lng > 180) {
      lat = 40.78054494676642;
      lng = -73.96702023848366;
    }
    this.center = { lat, lng }
    this.zoom = 13;
    
  }

  handleApiLoaded(map, maps) {
    this.map = map;
    this.maps = maps;
    const position = this.center;

    setTimeout(() => {
      this.map.setZoom(15);
      setTimeout(() => {
        this.marker = new this.maps.Marker({
          position,
          map,
          animation: maps.Animation.DROP,
          optimized: false,
          icon: greenMarker,
        });
      },500);
    }, 250);
    
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
      <div className="postcard-show map-wrapper" >
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAPS_API_KEY }}
          defaultCenter={ this.center }
          defaultZoom={ this.zoom }
          yesIWantToUseGoogleMapApiInternals={ true }
          onGoogleApiLoaded={ ({ map, maps }) => this.handleApiLoaded(map, maps) }
          options={ this.createMapOptions }
        ></GoogleMapReact>
      </div>
    );
  }
}

export default PostcardShow;