import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { Bike } from "../types/Bike"

export default function Map(props: any){


const MyMapComponent = withScriptjs(
  withGoogleMap((props: { bikes: Bike[], setSelectedBike: (bike:Bike) => void, selectedBike: Bike}) => (
    <GoogleMap
     defaultZoom={12} 
     defaultCenter={{ lat: 52.379922, lng: 4.899838 }}
    >
       {props.bikes.map((bike) => {
          const { latitude, longitude } = bike;
          const isSelected = props.selectedBike === bike;
          console.log(isSelected)
          // const color = isSelected ? {color:"grey"} : {color:"red"}
          return (
            <Marker
              key={bike.id}
              position={{ lat: latitude, lng: longitude }}
              title={bike.name}
              animation={google.maps.Animation.DROP}
              onClick={() => {
                console.log("something")
                props.setSelectedBike(bike);
             }}
            />
          );
        })}
    </GoogleMap>
  ))
);

  return (<MyMapComponent
    
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNlPylkcq2YP0tFJgpz-XgQF7RPkl8Cpw"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    bikes={props.bikes}
    setSelectedBike = {props.setSelectedBike}
    selectedBike = {props.selectedBike}
  />
  )
};
