import {
    APP_LOADING,
    APP_DONE_LOADING,
    SET_MESSAGE,
    CLEAR_MESSAGE
  } from "./actions";
import { AppStateActionTypes } from "../../types/actions";
  
  const initialState = {
    loading: false,
    message: null,
  };
  
  export default (state = initialState, action: AppStateActionTypes): any => {
    switch (action.type) {
      case APP_LOADING:
        return { ...state, loading: true };
  
      case APP_DONE_LOADING:
        return { ...state, loading: false };
  
      case SET_MESSAGE:
        console.log("Reducer", action.payload)
        return { ...state, message: action.payload };
  
      case CLEAR_MESSAGE:
        return { ...state, message: null };
  
      default:
        return state;
    }
  };