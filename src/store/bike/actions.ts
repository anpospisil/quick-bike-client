import { apiUrl } from "../../config/constants";
import axios from "axios";
import { Bike } from "../../types/Bike"
import { AppActions } from "../../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../index";

export const bikesFetched = (Bikes: Bike[]): AppActions =>  ({
    type: "FETCH_BIKES",
    bikes: Bikes,
})

export async function fetchAllBikes(dispatch: Dispatch<AppActions>, getState: () => AppState) {
    const response = await axios.get(`${apiUrl}/bike`);
  
    const Bikes = response.data.bikes;
    console.log("AXIOS CALL", response.data.bikes)
    dispatch(bikesFetched(Bikes));
  }