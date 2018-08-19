import { takeEvery } from "redux-saga/effects";
import * as Types from "../../Constants/ActionTypes";

import authRequest from "./authRequest";

function* auth() {
	yield takeEvery(Types.AUTH_REQUEST, authRequest);
}

export default auth;
