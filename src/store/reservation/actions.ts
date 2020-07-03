import { apiUrl } from "../../config/constants";
import axios from "axios";
import { Reservation } from "../../types/Reservation"
import { AppActions } from "../../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../index";
import user from "../../pages/User/user";

export const RESERVATION_SUCCESS = (Reservation: Reservation): AppActions =>  ({
    type: "RESERVATION_SUCCESS",
    reservation: Reservation,
})

export const createReservation = (id) => {
return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const response = await axios.post(`${apiUrl}/reservation`,
    {
        userId: user.id,
        bikeId: bike.id,
        reserved: 'true',
    }
    );
  
    dispatch(RESERVATION_SUCCESS(response));
  }
}