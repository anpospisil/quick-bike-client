import { apiUrl } from "../../config/constants";
import axios from "axios";
import { AppActions } from "../../types/actions";
import { Payload } from "../../types/User";
import { Dispatch } from "redux";
import { AppState } from "../index";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  // showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const IMAGE_UPDATED = "IMAGE_UPDATED"

export const imageUpdated = (newImage: string): AppActions => ({
  type: IMAGE_UPDATED,
  imageURL: newImage,
});

const loginSuccess = (userWithToken: Payload): AppActions => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken: Payload): AppActions => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name: string, email: string, password: string) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(setMessage("success", true, "(◠‿◠✿) account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(setMessage("success", true, "(◠‿◠✿) welcome back!"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      // console.log(error.response.message);

      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const updateProfilePic = (imageURL: string) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const token = selectToken(getState());
    dispatch(appLoading());
    try {
      const response = await axios.patch(`${apiUrl}/profile`, {
        imageURL,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const newImage = response.data.user.imageURL;
      dispatch(imageUpdated(newImage))
      dispatch(setMessage("success", true, "(◠‿◠✿) Profile image updated!"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
