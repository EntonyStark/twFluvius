import * as Types from "../Constants/ActionTypes";

const initialState = {
	user: null,
	error: null,
	isFetching: false
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case Types.AUTH_REQUEST: {
			return { ...state, isFetching: true, error: null };
		}
		case Types.AUTH_REQUEST_SUCCESS: {
			return { ...state, isFetching: false, user: payload };
		}
		case Types.AUTH_REQUEST_FAIL: {
			return { ...state, isFetching: false, error: payload };
		}

		case Types.SET_USER: {
			return { ...state, user: payload };
		}
		default:
			return state;
	}
};
