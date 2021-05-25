import React from 'react';
import GoogleMapReact from 'google-map-react';

class TripsIndexMap extends React.Component {
  constructor(props) {
    super(props);

    // expect to receive Trip objects as an array.
      // make Markers from Trip objects using their first lat/lng coords


    // this will be the default position and zoom the map centers on
    this.state = {
      center: {
        lat: 23.68437587797855,
        lng: -3.202092257879451
      },
      zoom: 0,
    }
  }

  componentDidMount() {
    // this.props.fetchTrips(); ?
  }

  handleApiLoaded(map, maps) {
    // can do stuff with map or maps here like make markers
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
      <div className="trips-index map-wrapper" >
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
          defaultCenter={ this.state.center }
          defaultZoom={ this.state.zoom }
          yesIWantToUseGoogleMapApiInternals={ true }
          onGoogleApiLoaded={ ({ map, maps }) => this.handleApiLoaded(map, maps) }
          options={ this.createMapOptions }
        ></GoogleMapReact>
      </div>
    );
  }
}

export default TripsIndexMap;