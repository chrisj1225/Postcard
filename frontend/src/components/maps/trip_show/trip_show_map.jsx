import React from 'react';
import GoogleMapReact from 'google-map-react';
import { limitChars } from '../../../util/func_util';
import { attachTripPos } from '../../../util/selectors';
import redMarker from '../../../assets/images/spotlight-poi2red.png'


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
    debugger
    this.zoom = 8;
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
    const bounds = new this.maps.LatLngBounds();

    if (this.postcards.length) {

      this.postcards.forEach(postcard => {

        if (postcard.lat > 180 || postcard.lng > 180) return;
        const position = { lat: parseFloat(postcard.lat.$numberDecimal), lng: parseFloat(postcard.lng.$numberDecimal) };
        bounds.extend(position);
        debugger
        const marker = new maps.Marker({
          position,
          map,
          animation: maps.Animation.DROP,
          optimized: false,
          icon: redMarker,
        });
        this.markers.push(marker);

        const content =
          '<div id="index-info-content-wrapper">' +
          '<h1 class="postcard-title-info">' +
          `${postcard.title}` + '</h1>' +
          '<p class="postcard-desc-info">' +
          `${postcard.body}` + '</p>' +
          '</div>';

        const infoWindow = new this.maps.InfoWindow({
          content
        });
        marker.addListener("mouseover", e => {
          infoWindow.open(map, marker);
        });
        marker.addListener("mouseout", e => {
          infoWindow.close();
        });
        marker.addListener("click", e => {
          this.props.history.push(`/trips/${postcard._id}`);
        });
        this.markers.push(marker);
        return true;
      });
      this.map.fitBounds(bounds);
      if (this.postcards.length === 1) this.map.setZoom(15);
      
      const overlay = new maps.OverlayView();
      overlay.draw = function() {
        this.getPanes().markerLayer.id='marker-layer';
      };
      overlay.setMap(map);
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

export default TripShowMap;