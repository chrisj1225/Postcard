import React from 'react';
import GoogleMapReact from 'google-map-react';

class TripShow extends React.Component {
  constructor(props) {
    super(props);

    const lat = 23.68437587797855;
    const lng = -3.202092257879451;

    // expect to receive Trip object and Postcard objects
      // make Markers from Postcard objects using their lat/lng coords

    // this will be the default position and zoom the map centers on
      // might be better to pull from props
    this.state = {
      center: {
        lat: lat,
        lng: lng
      },
      zoom: 0,
    }
  }

  componentDidMount() {
    // this.props.fetchTrips();
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
      <div className="trip-show map-wrapper" >
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

export default TripShow;