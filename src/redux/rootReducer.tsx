import { combineReducers } from "redux";
// Import your reducers here
import profileSliceReducer from "./ProfileSlice";

const rootReducer = combineReducers({
  profileState: profileSliceReducer,
});

export default rootReducer;
