import { combineReducers } from "redux";
import block_reducer from "./block_reducer";

const rootReducer = combineReducers({ block_reducer });

export default rootReducer;
