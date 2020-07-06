import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { useSelector } from "react-redux"
import { selectBikes } from "../store/bike/selectors"
import { Bike } from "../types/Bike"

const MyMapComponent = withScriptjs(
  withGoogleMap((props: { bikes: Bike[]; }) => (
    <GoogleMap
     defaultZoom={12} 
     defaultCenter={{ lat: 52.379922, lng: 4.899838 }}
    >
      
       {props.bikes.map((bike) => {
          const { latitude, longitude } = bike;
          return (
            <Marker
              key={bike.id}
              position={{ lat: latitude, lng: longitude }}
            />
          );
        })}
    </GoogleMap>
  ))
);

export default (props: { bikes: Bike[];}) => {

  return (<MyMapComponent
    //@ts-ignore
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNlPylkcq2YP0tFJgpz-XgQF7RPkl8Cpw"
    //@ts-ignore
    loadingElement={<div style={{ height: `100%` }} />}
    //@ts-ignore
    containerElement={<div style={{ height: `400px` }} />}
    //@ts-ignore
    mapElement={<div style={{ height: `100%` }} />}
    bikes={props.bikes}
  />
  )
};
