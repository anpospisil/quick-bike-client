export const selectReservation = (state:any) => {
    console.log("this is state!", state.reservation)
   return state.reservation;
 };

 export const selectUserReservations = (state:any) => {
  console.log("this is state!", state.reservations)
 return state.reservations;
};
