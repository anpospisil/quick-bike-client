import { User, Token } from "./User"

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

export type AppActions = UserActionTypes