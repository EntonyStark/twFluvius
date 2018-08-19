import { fork } from "redux-saga/effects";

import auth from "./Auth";

export default function*() {
	yield fork(auth);
}
