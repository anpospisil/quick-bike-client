import { Bike } from "../../types/Bike";
import { BikeActionTypes } from "../../types/actions";

const initialState: Bike[] = [];

export default function bikeReducer(
  state = initialState,
  action: BikeActionTypes
): Bike[] {
  switch (action.type) {
    case "FETCH_BIKES":
      return [...action.bikes];

    case "BIKE_RESERVED":
      const reservedBikesArray = state.map((bike) =>
        bike.id === action.bike.id ? action.bike : bike
      );
      return [...reservedBikesArray];

    case "BIKE_FREE":
      const freeBikesArray = state.map((bike) =>
        bike.id === action.bike.id ? action.bike : bike
      );
      return [...freeBikesArray];

    case "UNLOCK_BIKE":
      const unlockBike = state.map((bike) => 
        bike.id === action.bike.id ? action.bike : bike
      )
      return[...unlockBike]

    case "LOCK_BIKE":
      const lockBike = state.map((bike) => 
        bike.id === action.bike.id ? action.bike : bike
      )
      return[...lockBike]

    default:
      return state;
  }
}
