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

    case "TOGGLE_RESERVED":
      const reservedBikesArray = state.map((bike) =>
        bike.id === action.bike.id ? action.bike : bike
      );
      console.log("This is reservedBikeArray", reservedBikesArray);
      return [...reservedBikesArray];

    case "TOGGLE_LOCK":
      const toggleLock = state.map((bike) =>
        bike.id === action.bike.id ? action.bike : bike
      );
      console.log("BIKE REDUCER", toggleLock);
      return [...toggleLock];

    default:
      return state;
  }
}
