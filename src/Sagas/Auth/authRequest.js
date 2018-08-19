import { call, put } from "redux-saga/effects";
import * as actions from "../../Actions/authActions";
import { TRUE_CRED } from "../../Constants/ActionTypes";
import comparison from "../../Utils/comparison";
import saveCredsToStorage from "../../Utils/saveCredsToStorage";

export default function* authRequest({ payload }) {
	let to;
	let result;

	function* sleep(time) {
		yield new Promise(resolve => {
			to = setTimeout(resolve, time);
			result = comparison(payload, TRUE_CRED);
		});
	}

	function* clear() {
		yield new Promise(resolve => {
			clearTimeout(to);
			resolve();
		});
	}

	yield call(clear);
	yield call(sleep, 2000);

	if (result) {
		saveCredsToStorage(payload);
		yield put(actions.authRequestSuccess(payload));
	} else {
		yield put(actions.authRequestFail(true));
	}
}
