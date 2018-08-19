import React from "react";
import PropTypes from "prop-types";

import sprite from "../../Image/sprite.svg";

const element = props => (
	<div
		className={
			props.today ? "calendar__item calendar__item--today" : "calendar__item"
		}>
		<div
			className={
				props.today
					? "calendar__title calendar__title--today"
					: "calendar__title"
			}>
			<h1 className="calendar__day">{props.id}</h1>
		</div>
		<button
			disabled={props.events.length === 1}
			className={
				props.today
					? "calendar__add-event calendar__add-event--today"
					: "calendar__add-event"
			}
			onClick={props.add.bind(null, props.id)}>
			<svg className="calendar__icon">
				<use xlinkHref={`${sprite}#icon-plus`} />
			</svg>
		</button>
		{props.events &&
			props.events.map((el, i) => (
				<div
					onClick={props.edit.bind(null, props.id)}
					className={
						props.prev
							? "calendar__event calendar__event--prev"
							: "calendar__event calendar__event--next"
					}
					key={i}>
					<span className="calendar__event-name">{el.name}</span>
				</div>
			))}
	</div>
);
element.propTypes = {
	today: PropTypes.bool,
	prev: PropTypes.bool,
	id: PropTypes.number,
	events: PropTypes.array,
	add: PropTypes.func,
	edit: PropTypes.func
};

export default element;
