import { Bike } from "../../types/Bike"
import { BikeActionTypes } from "../../types/actions";

const initialState: Bike[] = [];
  
  export default function bikeReducer(state = initialState, action: BikeActionTypes): Bike[] {
    switch (action.type) {
  
      case 'FETCH_BIKES':
        return [...action.bikes];

      case 'BIKE_RESERVED':
        return {...state, ...action.bike} 

      case 'BIKE_FREE':
        return {...state, ...action}   
  
      default:
        return state;
    }
  }