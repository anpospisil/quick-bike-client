import { combineReducers } from "redux";
// import appState from "./appState/reducer";
// import user from "./user/reducer";
import bike from "./bike/reducer"
import reservation from "./reservation/reducer"

export default combineReducers({
  // user,
  bike,
  reservation,
});
