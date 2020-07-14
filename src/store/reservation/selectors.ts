export const selectReservation = (state:any) => {
    console.log("this is reservation state!", state.reservation.reservation)
   return state.reservation;
 };