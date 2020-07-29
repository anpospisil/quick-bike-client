import { apiUrl } from "../../config/constants";
import axios from "axios";
// import { Reservation } from "../../types/Reservation"
// import { Bike } from "../../types/Bike"
import { AppActions } from "../../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../index";
import { selectToken } from "../user/selectors";
import { setMessage } from "../appState/actions";
// import { LOCK_BIKE } from "../bike/actions"

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

export const USER_RESERVATION_RELEASED = ():AppActions => ({ type: "USER_RESERVATION_RELEASED" });
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
    const newReservation = response.data.reservation;
    console.log("NEW RESERVATION", newReservation);
    dispatch(RESERVATION_SUCCESS(newReservation));
    dispatch(USER_RESERVATION_FETCHED(newReservation));
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

    const Bike = response.data.bike;
    console.log("THIS IS RESERVED", response.data);
    dispatch(TOGGLE_RESERVED(Bike));
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

//Sends confirmation email
export const sendEmail = (name:string | undefined) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const token = selectToken(getState());
    try{
      const response = await axios.post(
        `${apiUrl}/send`,
        {
          name: name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.message)
    } catch(error){
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  }
}

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
    dispatch(USER_RESERVATION_RELEASED())
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
export const setBikeFree = () => {
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

    const Bike = response.data.bike;
    console.log("THIS IS FREE", response.data.bike);
    dispatch(TOGGLE_RESERVED(Bike));
    // dispatch(LOCK_BIKE(Bike))
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
