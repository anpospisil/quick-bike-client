import { Reservation } from "../../types/Reservation"
import { ReservationActionTypes } from "../../types/actions";

const initialState: Reservation = {
    id: 0,
    startTime: new Date(),
    endTime: new Date(),
    cost: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 0,
    bikeId: 0,

}
  
  export default function reservationReducer(state = initialState, action: ReservationActionTypes): Reservation {
    switch (action.type) {
  
      case 'RESERVATION_SUCCESS':
        return {...state, ...action.reservation}
  
      default:
        return state;
    }
  }