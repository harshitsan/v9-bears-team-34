import { combineReducers } from "redux";
import placeholderReducer from "./placeholderReducer";

export default combineReducers({
  placeholder: placeholderReducer
});
