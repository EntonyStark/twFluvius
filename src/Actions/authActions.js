import * as Types from "../Constants/ActionTypes";

export const authRequest = payload => ({
	type: Types.AUTH_REQUEST,
	payload
});

export const authRequestSuccess = payload => ({
	type: Types.AUTH_REQUEST_SUCCESS,
	payload
});

export const authRequestFail = payload => ({
	type: Types.AUTH_REQUEST_FAIL,
	payload
});

export const setUser = payload => ({
	type: Types.SET_USER,
	payload
});
