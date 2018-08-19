import moment from "moment";

import * as Types from "../Constants/ActionTypes";

const initialState = {
	month: null,
	year: 2018,
	today: null,
	base: [],
	selectedMonth: {},
	addVal: null,
	initialValues: null
};

const createArr = (maxNumber, sing, count) => {
	const year = 2018;
	let month = null;
	let monthName = null;
	switch (sing) {
		case "init": {
			month = moment().month();
			monthName = moment().format("MMMM");
			break;
		}
		case "next": {
			const date = new Date(year, count);
			month = count;
			monthName = moment(date).format("MMMM");
			break;
		}
		case "prev": {
			const date = new Date(year, count);
			month = count;
			monthName = moment(date).format("MMMM");
			break;
		}
		default:
			break;
	}

	let arr = [];
	for (let i = 1; maxNumber >= i; i++) {
		arr.push(i);
	}

	const mewArr = arr.map(el => {
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

	const firstDayOfMonth = moment(new Date(year, count, 1)).format("dddd");
	const addDay = emptyDays(firstDayOfMonth);
	return addDay.concat(mewArr);
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
			const today = new Date().getDate();
			const monthName = moment().format("MMMM");

			const hasMonth = hasMonthInState(state.base, state.year, monthName);

			if (hasMonth) {
				return state;
			}

			const dayOfTheMonth = createArr(amountOfDays, "init");
			const selectedMonth = {
				dayOfTheMonth,
				year: state.year,
				today,
				monthName
			};

			return {
				...state,
				month: { count: month, name: monthName },
				today,
				selectedMonth,
				base: state.base.concat(selectedMonth)
			};
		}
		case Types.PREV_MONTH: {
			const count = state.month.count - 1 === -1 ? 0 : state.month.count - 1;
			const date = new Date(state.year, count);
			const monthName = moment(date).format("MMMM");
			const today = new Date().getDate();
			const month = { count, name: monthName };

			const hasMonth = hasMonthInState(state.base, state.year, monthName);

			if (hasMonth) {
				const selectedMonth = state.base.filter(
					el => el.year === state.year && el.monthName === monthName
				)[0];
				return { ...state, selectedMonth, month };
			} else {
				const amountOfDays = moment(date).daysInMonth();

				const dayOfTheMonth = createArr(amountOfDays, "prev", count);

				const selectedMonth = {
					dayOfTheMonth,
					year: state.year,
					today,
					monthName
				};

				return {
					...state,
					month,
					selectedMonth,
					today,
					base: state.base.concat(selectedMonth)
				};
			}
		}
		case Types.NEXT_MONTH: {
			const count = state.month.count + 1 === 12 ? 11 : state.month.count + 1;
			const newDate = new Date(state.year, count);
			const monthName = moment(newDate).format("MMMM");
			const today = new Date().getDate();
			const month = { count, name: monthName };

			const hasMonth = hasMonthInState(state.base, state.year, monthName);

			if (hasMonth) {
				const selectedMonth = state.base.filter(
					el => el.year === state.year && el.monthName === monthName
				)[0];
				return { ...state, selectedMonth, month };
			} else {
				const amountOfDays = moment(newDate).daysInMonth();

				const dayOfTheMonth = createArr(amountOfDays, "next", count);

				const selectedMonth = {
					dayOfTheMonth,
					year: state.year,
					today,
					monthName
				};
				return {
					...state,
					month,
					selectedMonth,
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
