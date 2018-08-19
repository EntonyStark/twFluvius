import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import calendar from "./calendarReducer";
import auth from "./authReducer";

export default combineReducers({
	form: formReducer,
	calendar,
	auth
});
