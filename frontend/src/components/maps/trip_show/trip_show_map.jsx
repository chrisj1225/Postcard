import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import React from 'react';

class TripShowMap extends React.Component {
  constructor(props) {
    super(props);

    // expect to receive Trip objects as an array.
      // make Markers from Trip objects using their first lat/lng coords

    this.state = {
      center: {
        lat: 23.68437587797855,
        lng: -3.202092257879451
      },
      zoom: 12,
    }
  }

  componentDidMount() {
    // this.props.fetchTrips();
  }

  render() {

    const PageMap = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultZoom={this.state.zoom}
        defaultCenter={this.state.center}
        >
          {/* Markers live here */}
        </GoogleMap>
    )));

    return (
      <PageMap
        googleMapURL={process.env.REACT_APP_MAPS_API_URL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px`, width: `1000px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default TripShowMap;