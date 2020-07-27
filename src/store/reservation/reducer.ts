import { Reservation } from "../../types/Reservation";
import { ReservationActionTypes } from "../../types/actions";

const initialState: Reservation[] = [];

export default function reservationReducer(
  state = initialState,
  action: ReservationActionTypes
): Reservation[] {
  switch (action.type) {
    case "RESERVATION_SUCCESS":
      return [...state, action.reservation];

    case "RESERVATION_ENDED":
      const reservationUpdate = state.map((reservation) =>
        reservation.id === action.reservation.id
          ? action.reservation
          : reservation
      );
      return [...reservationUpdate];

    // case 'USER_RESERVATIONS_FETCHED':
    //   return [...action.reservations]

    default:
      return state;
  }
}
