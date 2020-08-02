import React, { FunctionComponent, ReactNode } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { compose, withProps } from "recompose"
import { Bike } from "../types/Bike"

export default function Map(props: any){
  const composeProps = {
    googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyDNlPylkcq2YP0tFJgpz-XgQF7RPkl8Cpw",
    loadingElement:<div style={{ height: `100%` }} />,
    containerElement:<div style={{ height: `400px` }} />,
    mapElement:<div style={{ height: `100%` }} />,
  }

  type CallbackProps = {
    bikes: Bike[],
    setSelectedBike: (bike:Bike) => void,
    selectedBike: Bike,
    children?: ReactNode
  } 

  const callback: FunctionComponent<any> = (props: any) => {
    function makeMarker (bike: any) {
      const { latitude, longitude } = bike;
      const isSelected = props.selectedBike === bike;
      console.log(isSelected)

      function onClick () {
        console.log("something")
        props.setSelectedBike(bike);
      }

      return (
        <Marker
          key={bike.id}
          position={{ lat: latitude, lng: longitude }}
          title={bike.name}
          // animation={google.maps.Animation.DROP}
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

  const x = {
    bikes: props.bikes,
    setSelectedBike: props.setSelectedBike,
    selectedBike: props.selectedBike
  }

  return (<MyMapComponent {...x} />)
};
