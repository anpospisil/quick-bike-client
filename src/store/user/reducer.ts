import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";
// import {
//     RESERVATION_FETCHED,
//   } from "../reservation/actions";
import { UserActionTypes, ReservationActionTypes } from "../../types/actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  reservation: null,
};

export default (
  state = initialState,
  action: UserActionTypes | ReservationActionTypes
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case "USER_RESERVATION_FETCHED":
      return { ...state, reservation: action.reservation };

    case "USER_RESERVATION_RELEASED":
      return { ...state, reservation: null };
    default:
      return state;
  }
};
