
export const selectToken = (state:any) => {
    console.log("TOKEN!", state.user.token)
    return state.user.token;
}
export const selectUser = (state:any) => {
   return state.user;
}
