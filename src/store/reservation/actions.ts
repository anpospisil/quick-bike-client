import { apiUrl } from "../../config/constants";
import axios from "axios";
// import { Reservation } from "../../types/Reservation"
// import { Bike } from "../../types/Bike"
import { AppActions } from "../../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../index";
import { selectToken } from "../user/selectors";
import { setMessage } from "../appState/actions";

export const RESERVATION_SUCCESS = (Reservation: any): AppActions => ({
  type: "RESERVATION_SUCCESS",
  reservation: Reservation,
});
export const RESERVATION_ENDED = (Reservation: any): AppActions => ({
  type: "RESERVATION_ENDED",
  reservation: Reservation,
});
export const TOGGLE_RESERVED = (Bike: any): AppActions => ({
  type: "TOGGLE_RESERVED",
  bike: Bike,
});
export const USER_RESERVATION_FETCHED = (Reservation: any): AppActions => ({
  type: "USER_RESERVATION_FETCHED",
  reservation: Reservation,
});

export const USER_RESERVATION_RELEASED = (): AppActions => ({
  type: "USER_RESERVATION_RELEASED",
});
// export const USER_RESERVATIONS_FETCHED = (Reservations: any): AppActions => ({
//   type: "USER_RESERVATIONS_FETCHED",
//   reservations: Reservations,
// });

// //Gets all user reservations
// export async function fetchUserReservations(
//   dispatch: Dispatch<AppActions>,
//   getState: () => AppState
// ) {
//   const response = await axios.get(`${apiUrl}/reservation/all`);

//   const Reservations = response.data.reservations;
//   console.log("AXIOS RESERVE CALL", response.data.reservations);
//   dispatch(USER_RESERVATIONS_FETCHED(Reservations));
// }

//Creates new reservation, sets bike to reserved & sends reservation confirmation email w/ lockCode
export const createReservation = (id: number, name: string) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const token = selectToken(getState());
    try {
      const response = await axios.post(
        `${apiUrl}/reservation`,
        {
          bikeId: id,
          startTime: new Date(),
          reserved: true,
          name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newReservation = response.data.reservation;
      const Bike = response.data.bike;

      console.log("NEW RESERVATION", newReservation);
      dispatch(RESERVATION_SUCCESS(newReservation));
      dispatch(USER_RESERVATION_FETCHED(newReservation));

      console.log("THIS IS RESERVED", response.data);
      dispatch(TOGGLE_RESERVED(Bike));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  };
};

//Ends the reservation, sets bike to not reserved & send end reservation confirmation email
export const endReservation = () => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const token = selectToken(getState());
    try {
      const response = await axios.patch(
        `${apiUrl}/reservation/end`,
        {
          reserved: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const Reservation = response.data.reservation;
      const Bike = response.data.bike;

      dispatch(RESERVATION_ENDED(Reservation));
      dispatch(USER_RESERVATION_RELEASED());
      dispatch(TOGGLE_RESERVED(Bike));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  };
};

//Sends reservation ended confirmation email
export const sendReservationEndEmail = () => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const token = selectToken(getState());
    try {
      const response = await axios.post(
        `${apiUrl}/send/end`,{},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.message);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  };
};