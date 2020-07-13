import {
    LOG_OUT,
    LOGIN_SUCCESS,
    TOKEN_STILL_VALID,
  } from "./actions";
import { UserActionTypes } from "../../types/actions";
  
  const initialState = {
    token: localStorage.getItem("token"),
    name: null,
    email: null,
  };
  
  export default (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        localStorage.setItem("token", action.token.jwt);
        return { ...state, ...action.token };
  
      case LOG_OUT:
        localStorage.removeItem("token");
        return { ...initialState, token: null };
  
      case TOKEN_STILL_VALID:
        return { ...state, ...action.token };
  
      default:
        return state;
    }
  };