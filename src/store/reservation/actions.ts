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
export const BIKE_RESERVED = (Bike: any): AppActions => ({
  type: "BIKE_RESERVED",
  bike: Bike,
});
export const BIKE_FREE = (Bike: any): AppActions => ({
  type: "BIKE_FREE",
  bike: Bike,
});
export const RESERVATION_FETCHED = (Reservation: any): AppActions => ({
  type: "RESERVATION_FETCHED",
  reservation: Reservation,
});

export const RESERVATION_RELEASED = ():AppActions => ({ type: "RESERVATION_RELEASED" });
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

//Creates new reservation
export const createReservation = (id: number) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const token = selectToken(getState());
    try{
    const response = await axios.post(
      `${apiUrl}/reservation`,
      {
        bikeId: id,
        startTime: new Date(),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const newReservation = response.data;
    console.log("NEW RESERVATION", newReservation);
    dispatch(RESERVATION_SUCCESS(newReservation));
    dispatch(RESERVATION_FETCHED(newReservation));
    } catch(error) {
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

//Updates selected Bike to reserved
export const setBikeToReserved = (id: number) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const token = selectToken(getState());
    try{
    const response = await axios.patch(
      `${apiUrl}/reservation`,
      {
        id,
        reserved: true,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const Bike = response.data;
    console.log("THIS IS RESERVED", response.data);
    dispatch(BIKE_RESERVED(Bike));
    } catch(error){
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

//Ends the reservation
export const endReservation = () => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const token = selectToken(getState());
    try{
    const response = await axios.patch(
      `${apiUrl}/reservation/end`,
      {
        endTime: new Date(),
        cost: 3,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch(RESERVATION_ENDED(response.data));
    dispatch(RESERVATION_RELEASED())
    } catch(error){
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

//Updates a reserved Bike to not reserved
export const setBikeFree = (id: number) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const token = selectToken(getState());
    try{
    const response = await axios.patch(
      `${apiUrl}/reservation/end/bike`,
      {
        reserved: false,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const Bike = response.data;
    console.log("THIS IS FREE", response.data);
    dispatch(BIKE_FREE(Bike));
    } catch(error){
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
