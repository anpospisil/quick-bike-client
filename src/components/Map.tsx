import React, { FunctionComponent } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { compose, withProps } from "recompose"

const composeProps = {
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `100%` }} />,
}

const callback: FunctionComponent<any> = (props: any) => {
  function makeMarker(bike: any) {
    const { latitude, longitude } = bike;

    function onClick() {
      props.setSelectedBike(bike);
    }

    return (
      <Marker
        key={bike.id}
        position={{ lat: latitude, lng: longitude }}
        title={bike.name}
        onClick={onClick}
      />
    );
  }

  const markers = props.bikes.map(makeMarker)

  return <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 52.379922, lng: 4.899838 }}
  >
    {markers}
  </GoogleMap>
}

const MyMapComponent = compose(
  withProps(composeProps),
  withScriptjs,
  withGoogleMap
)(
  callback
)

export default function Map(props: any) {
  const x = {
    bikes: props.bikes,
    setSelectedBike: props.setSelectedBike,
    selectedBike: props.selectedBike
  }

  return (<MyMapComponent {...x} />)
};