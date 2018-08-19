import moment from "moment";

import * as Types from "../Constants/ActionTypes";

const initialState = {
	month: null,
	year: null,
	today: null,
	base: [],
	selectedMonth: {},
	addVal: null,
	initialValues: null
};

const createArr = maxNumber => {
	let arr = [];
	for (let i = 1; maxNumber >= i; i++) {
		arr.push(i);
	}
	return arr;
};

const emptyDays = data => {
	const dayOfWeek = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday"
	];

	const index = dayOfWeek.indexOf(data);
	if (index === 0) return [];

	const newArr = dayOfWeek.slice(0, index);
	return newArr.map(el => ({ id: el, day: el }));
};

const hasMonthInState = (arr, year, month) => {
	const check = arr.some(el => el.year === year && el.monthName === month);
	return check;
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case Types.GET_INITIAL_INFO: {
			const amountOfDays = moment().daysInMonth();
			const month = moment().month();
			const year = moment().year();
			const today = new Date().getDate();
			const monthName = moment().format("MMMM");
			// moment().format("YYYY-MM-DD")

			const firstDayOfMonth = moment(new Date(year, month, 1)).format("dddd");
			const addDay = emptyDays(firstDayOfMonth);

			const hasMonth = hasMonthInState(state.base, year, monthName);

			if (hasMonth) {
				return state;
			}

			const dayOfTheMonth = createArr(amountOfDays).map(el => {
				const date = new Date(year, month, el);
				const now = new Date();
				return {
					id: el,
					date,
					prev: moment(date).isBefore(now),
					events: [],
					month: monthName,
					day: moment(date).format("dddd")
				};
			});

			const selectedMonth = {
				dayOfTheMonth: addDay.concat(dayOfTheMonth),
				year,
				today,
				monthName
			};

			return {
				...state,
				month: { count: month, name: monthName },
				year,
				today,
				selectedMonth,
				base: state.base.concat(selectedMonth)
			};
		}
		case Types.PREV_MONTH: {
			const count = state.month.count - 1 === -1 ? 11 : state.month.count - 1;
			const year =
				state.month.count === 0 && count === 11 ? state.year - 1 : state.year;
			const date = new Date(year, count);
			const monthName = moment(date).format("MMMM");
			const today = new Date().getDate();
			const month = { count, name: monthName };

			const hasMonth = hasMonthInState(state.base, year, monthName);

			if (hasMonth) {
				const selectedMonth = state.base.filter(
					el => el.year === year && el.monthName === monthName
				)[0];
				return { ...state, selectedMonth, month };
			} else {
				const amountOfDays = moment(date).daysInMonth();

				const firstDayOfMonth = moment(new Date(year, count, 1)).format("dddd");
				const addDay = emptyDays(firstDayOfMonth);

				const dayOfTheMonth = createArr(amountOfDays).map(el => {
					const date = new Date(year, count, el);
					const now = new Date();
					return {
						id: el,
						date,
						events: [],
						prev: moment(date).isBefore(now),
						month: monthName,
						day: moment(date).format("dddd")
					};
				});

				const selectedMonth = {
					dayOfTheMonth: addDay.concat(dayOfTheMonth),
					year,
					today,
					monthName
				};

				return {
					...state,
					month,
					selectedMonth,
					year,
					today,
					base: state.base.concat(selectedMonth)
				};
			}
		}
		case Types.NEXT_MONTH: {
			const count = state.month.count + 1 === 12 ? 0 : state.month.count + 1;
			const year =
				state.month.count === 11 && count === 0 ? state.year + 1 : state.year;
			const newDate = new Date(year, count);
			const monthName = moment(newDate).format("MMMM");
			const today = new Date().getDate();
			const month = { count, name: monthName };

			const hasMonth = hasMonthInState(state.base, year, monthName);

			if (hasMonth) {
				const selectedMonth = state.base.filter(
					el => el.year === year && el.monthName === monthName
				)[0];
				return { ...state, selectedMonth, month };
			} else {
				const amountOfDays = moment(newDate).daysInMonth();

				const firstDayOfMonth = moment(new Date(year, count, 1)).format("dddd");
				const addDay = emptyDays(firstDayOfMonth);

				const dayOfTheMonth = createArr(amountOfDays).map(el => {
					const date = new Date(year, count, el);
					const now = new Date();
					return {
						id: el,
						date,
						events: [],
						prev: moment(date).isBefore(now),
						month: monthName,
						day: moment(date).format("dddd")
					};
				});
				const selectedMonth = {
					dayOfTheMonth: addDay.concat(dayOfTheMonth),
					year,
					today,
					monthName
				};
				return {
					...state,
					month,
					selectedMonth,
					year,
					today,
					base: state.base.concat(selectedMonth)
				};
			}
		}
		case Types.SET_VALUES_FOR_ADD: {
			return { ...state, addVal: payload };
		}
		case Types.SET_VALUES_FOR_EDIT: {
			const { id } = payload;
			const initialValues = state.selectedMonth.dayOfTheMonth.filter(
				el => el.id === id
			)[0].events[0];
			return { ...state, addVal: payload, initialValues };
		}

		case Types.ADD_EVENT: {
			const { id, year, monthName } = state.addVal;

			const selectedMonth = {
				...state.selectedMonth,
				dayOfTheMonth: state.selectedMonth.dayOfTheMonth.map(
					el =>
						el.id === id ? { ...el, events: el.events.concat(payload) } : el
				)
			};

			const base = state.base.map(
				el =>
					el.year === year && el.monthName === monthName ? selectedMonth : el
			);
			return { ...state, base, selectedMonth };
		}

		case Types.EDIT_EVENT: {
			const { id, year, monthName } = state.addVal;

			const selectedMonth = {
				...state.selectedMonth,
				dayOfTheMonth: state.selectedMonth.dayOfTheMonth.map(
					el => (el.id === id ? { ...el, events: [].concat(payload) } : el)
				)
			};

			const base = state.base.map(
				el =>
					el.year === year && el.monthName === monthName ? selectedMonth : el
			);
			return { ...state, base, selectedMonth };
		}

		case Types.REMOVE_EVENT: {
			const { id, year, monthName } = state.addVal;

			const selectedMonth = {
				...state.selectedMonth,
				dayOfTheMonth: state.selectedMonth.dayOfTheMonth.map(
					el => (el.id === id ? { ...el, events: [] } : el)
				)
			};

			const base = state.base.map(
				el =>
					el.year === year && el.monthName === monthName ? selectedMonth : el
			);
			return { ...state, base, selectedMonth, initialValues: null };
		}

		default:
			return state;
	}
};
