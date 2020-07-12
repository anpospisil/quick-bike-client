import { apiUrl } from "../../config/constants";
import axios from "axios";
// import { Reservation } from "../../types/Reservation"
// import { Bike } from "../../types/Bike"
import { AppActions } from "../../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../index";
import { selectToken } from "../user/selectors";
import { Reservation } from "../../types/Reservation";


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
        bikeId: id,
        reserved: true,
    },
    {
        headers: {Authorization: `Bearer ${token}` }
      }
    )
    ])
   
    dispatch(RESERVATION_SUCCESS(res1.data));
 
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

    export const userReservationsFetched = (Reservations: Reservation[]): AppActions =>  ({
      type: "FETCH_USER_RESERVATIONS",
      reservations: Reservations,
  })
  
  
  
  export async function fetchUserReservations(dispatch: Dispatch<AppActions>, getState: () => AppState) {
    const token = selectToken(getState())  
    const response = await axios.get(`${apiUrl}/reservation`, {
      headers: {Authorization: `Bearer ${token}` }
    }
  )
      
      const Reservations = response.data.reservations;
      console.log("AXIOS CALL", response.data.reservations)
      dispatch(userReservationsFetched(Reservations));
    }