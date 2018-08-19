import React from "react";
import PropTypes from "prop-types";

import sprite from "../../Image/sprite.svg";

const control = props => {
	const { selectedMonth, nextMonth, prevMonth } = props;
	return (
		<div className="calendar__control">
			<button className="calendar__icon-box" onClick={prevMonth}>
				<svg className="calendar__icon">
					<use xlinkHref={`${sprite}#icon-chevron-thin-left`} />
				</svg>
			</button>
			<h2 className="calendar__mouth-name">
				{selectedMonth && `${selectedMonth.monthName} ${selectedMonth.year}`}
			</h2>
			<button className="calendar__icon-box" onClick={nextMonth}>
				<svg className="calendar__icon">
					<use xlinkHref={`${sprite}#icon-chevron-thin-right`} />
				</svg>
			</button>
		</div>
	);
};
control.propTypes = {
	selectedMonth: PropTypes.object,
	nextMonth: PropTypes.func,
	prevMonth: PropTypes.func
};

export default control;
