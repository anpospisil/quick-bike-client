// import { User, Token } from "../User"
import { Bike } from "./Bike"
import { Reservation } from "./Reservation"


// USER ACTION TYPES
// export const DISPLAY_USER_INFO = "DISPLAY_USER_INFO"
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
// export const LOG_OUT = "LOG_OUT";

// export interface DisplayUserAction {
//     type: typeof DISPLAY_USER_INFO;
//     user: User[];
// }

// export interface UserLogInAction {
//     type: typeof LOGIN_SUCCESS;
//     token: Token;

// }

// export interface TokenValidAction {
//     type: typeof TOKEN_STILL_VALID
//     token: Token;
// }

// export interface UserLogOutAction {
//     type: typeof LOG_OUT;
//     token: Token;
// }

// export type UserActionTypes = DisplayUserAction | UserLogInAction | TokenValidAction | UserLogOutAction;


//BIKE ACTION TYPES
export const FETCH_BIKES = "FETCH_BIKES"

export interface SetBikeAction {
    type: typeof FETCH_BIKES;
    bikes: Bike[];
} 

export type BikeActionTypes = SetBikeAction 


//RESERVATION ACTION TYPES

export const RESERVATION_SUCCESS = "RESERVATION_SUCCESS"

export interface SetReservationAction {
    type: typeof RESERVATION_SUCCESS;
    reservation: Reservation;
} 

export type ReservationActionTypes = SetReservationAction


export type AppActions = BikeActionTypes | ReservationActionTypes

// ** put this back up there when implementing user login ^^ UserActionTypes