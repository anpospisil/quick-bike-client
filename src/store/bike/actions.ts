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

export const UNLOCK_BIKE = (Bike: Bike): AppActions =>  ({
    type: "UNLOCK_BIKE",
    bike: Bike
})

export const LOCK_BIKE = (Bike: Bike): AppActions =>  ({
  type: "LOCK_BIKE",
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

  //unlock bike
  export const unlockBike = (code:number | undefined) => {
    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const token = selectToken(getState())
        try {
        const response = await axios.patch(`${apiUrl}/bike/unlock`,
        {
          locked: false,
          lockCode: code,        
        },
        {
            headers: {Authorization: `Bearer ${token}` }
          }
        )
          
        const Bike = response.data.bike
        console.log("unlock bike res", Bike)
        dispatch(UNLOCK_BIKE(Bike));
        
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

    //lock bike
    export const lockBike = () => {
      return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
          const token = selectToken(getState())
          try {
          const response = await axios.patch(`${apiUrl}/bike/lock`,
          {
              locked: true,
          },
          {
              headers: {Authorization: `Bearer ${token}` }
            }
          )
          const Bike = response.data.bike
          dispatch(LOCK_BIKE(Bike));
          
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