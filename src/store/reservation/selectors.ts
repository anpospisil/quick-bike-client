
export const selectReservations = (state:any) => {
    console.log("this is reservation state!", state.reservation)
   return state.reservation;
 };

 export const selectUserReservations = (state:any) => {
  console.log("this is state!", state.reservations)
 return state.reservations;
};
