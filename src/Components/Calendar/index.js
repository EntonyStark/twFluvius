import React from "react";
import PropTypes from "prop-types";

import Control from "./control";
import Calendar from "./calendar";

const calendarPage = props => {
	return (
		<div className="calendar">
			<Control
				nextMonth={props.nextMonth}
				prevMonth={props.prevMonth}
				selectedMonth={props.selectedMonth}
			/>
			<Calendar
				openAddModal={props.openAddModal}
				openEditModal={props.openEditModal}
				selectedMonth={props.selectedMonth}
				setValuesForAdd={props.setValuesForAdd}
				setValuesForEdit={props.setValuesForEdit}
			/>
		</div>
	);
};
calendarPage.propTypes = {
	selectedMonth: PropTypes.object,
	nextMonth: PropTypes.func,
	prevMonth: PropTypes.func,
	openAddModal: PropTypes.func,
	setValuesForEdit: PropTypes.func,
	openEditModal: PropTypes.func
};

export default calendarPage;
