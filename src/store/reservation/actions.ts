import { apiUrl } from "../../config/constants";
import axios from "axios";
// import { Reservation } from "../../types/Reservation"
// import { Bike } from "../../types/Bike"
import { AppActions } from "../../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../index";
import { selectToken } from "../user/selectors";


export const RESERVATION_SUCCESS = (Reservation:any): AppActions =>  ({
    type: "RESERVATION_SUCCESS",
    reservation: Reservation,
})
export const RESERVATION_ENDED = (Reservation:any): AppActions =>  ({
    type: "RESERVATION_ENDED",
    reservation: Reservation,
})
export const BIKE_RESERVED = (Bike: any): AppActions =>  ({
  type: "BIKE_RESERVED",
  bike: Bike,
})
export const BIKE_FREE = (Bike: any): AppActions =>  ({
  type: "BIKE_FREE",
  bike: Bike,
})
export const RESERVATION_FETCHED = (Reservation: any): AppActions =>  ({
  type: "RESERVATION_FETCHED",
  reservation: Reservation,
})

export async function fetchCurrentReservation(dispatch: Dispatch<AppActions>, getState: () => AppState) {
  const response = await axios.get(`${apiUrl}/reservation`);

  const Reservation = response.data.reservations;
  console.log("AXIOS RESERVE CALL", response.data.reservations)
  dispatch(RESERVATION_FETCHED(Reservation));
}

export const createReservation = (id: number) => {
return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const token = selectToken(getState())
    const [res1, res2] = await Promise.all([
      axios.post(`${apiUrl}/reservation`,
    {
        bikeId: id,
        startTime: new Date(),
    },
    {
        headers: {Authorization: `Bearer ${token}` }
      }
    ),
    axios.patch(`${apiUrl}/reservation`,
    {
        id,
        reserved: true,
    },
    {
        headers: {Authorization: `Bearer ${token}` }
      }
    )
    ])
    const newReservation = res1.data
    console.log("NEW RESERVATION", newReservation)
    dispatch(RESERVATION_SUCCESS(res1.data));
    const bikeReserved = res2.data
    dispatch(BIKE_RESERVED(res2.data));
    
  }
  
}

export const endReservation = () => {
    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const token = selectToken(getState())
        const [res1, res2] = await Promise.all ([
          axios.patch(`${apiUrl}/reservation/end`,
        {
            endTime: new Date(),
            cost: 3,
        },
        {
            headers: {Authorization: `Bearer ${token}` }
          }
        ),
        axios.patch(`${apiUrl}/reservation/end/bike`,
        {
          reserved: false
        },
        {
            headers: {Authorization: `Bearer ${token}` }
          }
        )
        ])

       
        dispatch(RESERVATION_ENDED(res1.data));
      
        dispatch(BIKE_FREE(res2.data));
        
      }
    }

