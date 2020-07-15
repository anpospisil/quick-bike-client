import { apiUrl } from "../../config/constants";
import axios from "axios";
import { Bike } from "../../types/Bike"
import { AppActions } from "../../types/actions";
import { Dispatch } from "redux";
import { selectToken } from "../user/selectors";
import { AppState } from "../index";

export const bikesFetched = (Bikes: Bike[]): AppActions =>  ({
    type: "FETCH_BIKES",
    bikes: Bikes,
})

export const TOGGLE_LOCK = (Bike: Bike): AppActions =>  ({
    type: "TOGGLE_LOCK",
    bike: Bike
})


export async function fetchAllBikes(dispatch: Dispatch<AppActions>, getState: () => AppState) {
    const response = await axios.get(`${apiUrl}/bike`);
  
    const Bikes = response.data.bikes;
    console.log("AXIOS BIKE CALL", response.data.bikes)
    dispatch(bikesFetched(Bikes));
  }

  export const toggleBikeLock = (locked:boolean) => {
    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const token = selectToken(getState())
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
        
      }
    }