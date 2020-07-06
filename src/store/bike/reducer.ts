import { Bike } from "../../types/Bike"
import { BikeActionTypes } from "../../types/actions";

const initialState: Bike[] = [];
  
  export default function bikeReducer(state = initialState, action: BikeActionTypes): Bike[] {
    switch (action.type) {
  
      case 'FETCH_BIKES':
        return [...action.bikes];
  
      default:
        return state;
    }
  }