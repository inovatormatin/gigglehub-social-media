import { combineReducers } from "redux";
// Import your reducers here
import profileSliceReducer from "./ProfileSlice";
import appSliceReducer from "./AppSlice";

const rootReducer = combineReducers({
  appState: appSliceReducer,
  profileState: profileSliceReducer,
});

export default rootReducer;
