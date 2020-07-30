import { User, Token } from "./User"
import { Bike } from "./Bike"
import { Reservation } from "./Reservation"

//APPSTATE ACTION TYPES
export const APP_LOADING = "APP_LOADING";
export const APP_DONE_LOADING = "APP_DONE_LOADING";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export interface appLoading{
     type: typeof APP_LOADING
}

export interface appDoneLoading{
     type: typeof APP_DONE_LOADING
}

export interface clearMessage{
     type: typeof CLEAR_MESSAGE
}

export type AppStateActionTypes = appLoading | appDoneLoading | clearMessage


// USER ACTION TYPES
export const DISPLAY_USER_INFO = "DISPLAY_USER_INFO"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

export interface DisplayUserAction {
    type: typeof DISPLAY_USER_INFO;
    user: User[];
}

export interface UserLogInAction {
    type: typeof LOGIN_SUCCESS;
    token: Token;

}

export interface TokenValidAction {
    type: typeof TOKEN_STILL_VALID
    token: Token;
}

export interface UserLogOutAction {
    type: typeof LOG_OUT;
    token: Token;
}

export type UserActionTypes = DisplayUserAction | UserLogInAction | TokenValidAction | UserLogOutAction;


//BIKE ACTION TYPES
export const FETCH_BIKES = "FETCH_BIKES"
export const BIKE_RESERVED = "BIKE_RESERVED"
export const BIKE_FREE = "BIKE_FREE"

export interface SetBikeAction {
    type: typeof FETCH_BIKES;
    bikes: Bike[];
} 

export interface SetBikeReserved {
    type: typeof BIKE_RESERVED;
    bike: Bike;
}

export interface SetBikeFree {
    type: typeof BIKE_FREE;
    bike: Bike;
}

export type BikeActionTypes = SetBikeAction | SetBikeReserved | SetBikeFree


//RESERVATION ACTION TYPES

export const RESERVATION_SUCCESS = "RESERVATION_SUCCESS"
export const RESERVATION_ENDED = "RESERVATION_ENDED"
export const FETCH_USER_RESERVATIONS = "FETCH_USER_RESERVATIONS"

export interface SetReservationAction {
    type: typeof RESERVATION_SUCCESS;
    reservation: Reservation;
} 

export interface EndReservationAction {
    type: typeof RESERVATION_ENDED;
    reservation: Reservation;
} 

export interface FetchUserReservationsAction {
    type: typeof FETCH_USER_RESERVATIONS;
    reservations: Reservation[];
} 

export type ReservationActionTypes = SetReservationAction | EndReservationAction | FetchUserReservationsAction


// ALL TOGETHER
export type AppActions = BikeActionTypes | ReservationActionTypes | UserActionTypes | AppStateActionTypes
