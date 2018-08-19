import * as Types from "../Constants/ActionTypes";

export const getInitialInfo = payload => ({
	type: Types.GET_INITIAL_INFO,
	payload
});

export const prevMonth = payload => ({
	type: Types.PREV_MONTH,
	payload
});

export const nextMonth = payload => ({
	type: Types.NEXT_MONTH,
	payload
});

export const addEvent = payload => ({
	type: Types.ADD_EVENT,
	payload
});

export const editEvent = payload => ({
	type: Types.EDIT_EVENT,
	payload
});

export const removeEvent = payload => ({
	type: Types.REMOVE_EVENT,
	payload
});

export const setValuesForAdd = payload => ({
	type: Types.SET_VALUES_FOR_ADD,
	payload
});

export const setValuesForEdit = payload => ({
	type: Types.SET_VALUES_FOR_EDIT,
	payload
});
