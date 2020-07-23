import { apiUrl } from "../../config/constants";
import axios from "axios";
import { Bike } from "../../types/Bike"
import { AppActions } from "../../types/actions";
import { Dispatch } from "redux";
import { selectToken } from "../user/selectors";
import { AppState } from "../index";
import { setMessage } from "../appState/actions"

export const bikesFetched = (Bikes: Bike[]): AppActions =>  ({
    type: "FETCH_BIKES",
    bikes: Bikes,
})

export const TOGGLE_LOCK = (Bike: Bike): AppActions =>  ({
    type: "TOGGLE_LOCK",
    bike: Bike
})


export async function fetchAllBikes(dispatch: Dispatch<AppActions>, getState: () => AppState) {
  try{
    const response = await axios.get(`${apiUrl}/bike`);
    const Bikes = response.data.bikes;
    dispatch(bikesFetched(Bikes));
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

  export const toggleBikeLock = (locked:boolean) => {
    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const token = selectToken(getState())
        try {
        const response = await axios.patch(`${apiUrl}/bike/lock`,
        {
            locked: locked
        },
        {
            headers: {Authorization: `Bearer ${token}` }
          }
        )
          
        const Bike = response.data
        dispatch(TOGGLE_LOCK(Bike));
        
        }catch(error){
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