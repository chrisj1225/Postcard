import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { limitChars } from '../../../util/func_util';
import redMarker from '../../../assets/images/spotlight-poi2red.png'
import greenMarker from '../../../assets/images/spotlight-poi2green.png'

class TripsIndexMap extends React.Component {
  constructor(props) {
    super(props);
    const lat = 23.68437587797855;
    const lng = -3.202092257879451;

    this.positions = [];
    this.center = { lat, lng };
    this.zoom = 0;

    this.createSearchBox = this.createSearchBox.bind(this);
  }

  componentDidMount() {
    // this.props.fetchTrips(); ?
  }

  componentWillUnmount() {
    if (this.markers) {
      this.markers.forEach(marker => {
        this.maps.event.clearInstanceListeners(marker);
      });
    }
  }

  handleApiLoaded(map, maps) {
    this.map = map;
    this.maps = maps;
    this.markerPopups = [];
    this.markers = [];

    this.map.addListener("click", e => {
      if (this.markers) for (let marker of this.markers) { marker.setMap(null) }
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
    setTimeout(this.createSearchBox,100);
  }

  createSearchBox() {
    const input = document.getElementById("cpf-search");
    input.style.display = "block";
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

      let lat, lng;

      if (places.length === 1) {

        places.forEach(place => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }
          
          this.placedMarker = new this.maps.Marker({
              map: this.map,
              icon: greenMarker,
              position: place.geometry.location,
              title: place.name,
          });

          lat = this.placedMarker.position.lat();
          lng = this.placedMarker.position.lng();
          this.props.handlePositionInput({ lat, lng });

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        this.map.fitBounds(bounds);
      } else {
        
        places.forEach(place => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }
          
          const marker = new this.maps.Marker({
              map: this.map,
              icon: redMarker,
              position: place.geometry.location,
              title: place.name,
          });

          this.markers.push(marker);
          let that = this;

          this.maps.event.addListener(marker, 'click', function() {
            for (let m of that.markers) { m.setIcon(redMarker) }
            marker.setIcon(greenMarker);
            that.placedMarker = marker;
            lat = that.placedMarker.position.lat();
            lng = that.placedMarker.position.lng();
            that.props.handlePositionInput({ lat, lng });
          });


          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        this.map.fitBounds(bounds);
      }

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
      <div className="trips-index map-wrapper" style={{ width: "1000px", height: "500px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY, libraries:['places'] }}
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