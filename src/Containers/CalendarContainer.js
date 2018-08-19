import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as actions from "../Actions/calendarActions";

import CalendarPage from "../Components/Calendar/index";
import WorkModal from "../Components/Calendar/modal";

class CalendarContainer extends Component {
	static propTypes = {
		getInitialInfo: PropTypes.func,
		addEvent: PropTypes.func,
		editEvent: PropTypes.func,
		removeEvent: PropTypes.func,
		year: PropTypes.number,
		month: PropTypes.object,
		initialValues: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
		amountOfDays: PropTypes.number,
		today: PropTypes.number,
		user: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
	};

	state = { isOpenAdd: false, isOpenEdit: false };

	closeAddModal = () => this.setState({ isOpenAdd: false });
	openAddModal = () => this.setState({ isOpenAdd: true });

	closeEditModal = () => this.setState({ isOpenEdit: false });
	openEditModal = () => this.setState({ isOpenEdit: true });

	componentDidMount() {
		this.props.getInitialInfo();
	}

	render() {
		return (
			<Fragment>
				<CalendarPage
					openEditModal={this.openEditModal}
					openAddModal={this.openAddModal}
					{...this.props}
				/>
				<WorkModal
					editFlag={false}
					isOpen={this.state.isOpenAdd}
					closeModal={this.closeAddModal}
					event={this.props.addEvent}
				/>
				<WorkModal
					editFlag={true}
					isOpen={this.state.isOpenEdit}
					closeModal={this.closeEditModal}
					event={this.props.editEvent}
					initialValues={this.props.initialValues}
					removeEvent={this.props.removeEvent}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	year: state.calendar.year,
	selectedMonth: state.calendar.selectedMonth,
	amountOfDays: state.calendar.amountOfDays,
	today: state.calendar.today,
	user: state.auth.user,
	initialValues: state.calendar.initialValues
});
const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			...actions
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CalendarContainer);
