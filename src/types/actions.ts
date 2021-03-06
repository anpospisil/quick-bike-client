import { User, Payload } from "./User"
import { Bike } from "./Bike"
import { Reservation } from "./Reservation"
import { Message } from "./Message";

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

export interface setMessage{
    type: typeof SET_MESSAGE
    payload: Message
}

export interface showMessageWithTimeout{
    type: typeof SET_MESSAGE
    payload: Message
}

export interface clearMessage{
     type: typeof CLEAR_MESSAGE
}

export type AppStateActionTypes = appLoading | appDoneLoading | clearMessage | setMessage | showMessageWithTimeout


// USER ACTION TYPES
export const DISPLAY_USER_INFO = "DISPLAY_USER_INFO"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const RESERVATION_FETCHED = "RESERVATION_FETCHED"
export const IMAGE_UPDATED = "IMAGE_UPDATED"

export interface DisplayUserAction {
    type: typeof DISPLAY_USER_INFO;
    user: User[];
}

export interface UserLogInAction {
    type: typeof LOGIN_SUCCESS;
    payload: Payload;

}

export interface TokenValidAction {
    type: typeof TOKEN_STILL_VALID
    payload: Payload;
}

export interface UserLogOutAction {
    type: typeof LOG_OUT;
    payload: Payload;    
}

export interface UserImageUpdatedAction {
    type: typeof IMAGE_UPDATED;
    imageURL: string;
}

export type UserActionTypes = DisplayUserAction | UserLogInAction | TokenValidAction | UserLogOutAction | UserImageUpdatedAction


//BIKE ACTION TYPES
export const FETCH_BIKES = "FETCH_BIKES"
export const TOGGLE_RESERVED = "TOGGLE_RESERVED"
export const BIKE_FREE = "BIKE_FREE"
export const TOGGLE_LOCK = "TOGGLE_LOCK"



export interface SetBikeAction {
    type: typeof FETCH_BIKES;
    bikes: Bike[];
} 

export interface SetBikeReserved {
    type: typeof TOGGLE_RESERVED;
    bike: Bike;
}

export interface SetBikeLock {
    type: typeof TOGGLE_LOCK
    bike: Bike;
}


export type BikeActionTypes = SetBikeAction | SetBikeReserved | SetBikeLock


//RESERVATION ACTION TYPES
export const RESERVATION_SUCCESS = "RESERVATION_SUCCESS"
export const RESERVATION_ENDED = "RESERVATION_ENDED"
export const USER_RESERVATION_FETCHED = "USER_RESERVATION_FETCHED"
export const USER_RESERVATION_RELEASED = "USER_RESERVATION_RELEASED"


export interface SetReservationAction {
    type: typeof RESERVATION_SUCCESS;
    reservation: Reservation;
} 

export interface EndReservationAction {
    type: typeof RESERVATION_ENDED;
    reservation: Reservation;
} 


export interface FetchedReservationAction {
    type: typeof USER_RESERVATION_FETCHED;
    reservation: Reservation;
} 

export interface ReleaseReservationAction {
    type: typeof USER_RESERVATION_RELEASED;
} 

// export interface FetchedUserReservationsAction {
//     type: typeof USER_RESERVATIONS_FETCHED;
//     reservations: Reservation[];
// } 

export type ReservationActionTypes = SetReservationAction | EndReservationAction | FetchedReservationAction | ReleaseReservationAction;
// FetchedUserReservationsAction ^^


// ALL TOGETHER
export type AppActions = BikeActionTypes | ReservationActionTypes | UserActionTypes | AppStateActionTypes
