import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import Element from "./element";

const calendar = props => {
	const add = id => {
		const { monthName, year } = props.selectedMonth;
		props.openAddModal();
		props.setValuesForAdd({ id, monthName, year });
	};

	const edit = id => {
		const { monthName, year } = props.selectedMonth;
		props.openEditModal();
		props.setValuesForEdit({ id, monthName, year });
	};

	let block = null;
	if (props.selectedMonth && props.selectedMonth.dayOfTheMonth) {
		block = props.selectedMonth.dayOfTheMonth.map(el => {
			const today =
				moment(el.date).format("YYYY-MM-DD") ===
				moment(new Date()).format("YYYY-MM-DD");
			return el.month ? (
				<Element
					key={el.id}
					today={today}
					prev={el.prev}
					id={el.id}
					add={add}
					edit={edit}
					events={el.events}
				/>
			) : (
				<div key={el.id} className="calendar__item calendar__item--empty" />
			);
		});
	}

	return (
		<div className="calendar__container">
			<div className="calendar__box">{block}</div>
		</div>
	);
};
calendar.propTypes = {
	openAddModal: PropTypes.func,
	openEditModal: PropTypes.func,
	setValuesForAdd: PropTypes.func,
	setValuesForEdit: PropTypes.func,
	selectedMonth: PropTypes.object
};

export default calendar;
