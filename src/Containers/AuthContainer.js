import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as actions from "../Actions/authActions";
import AuthForm from "../Components/Auth/index";

class AuthContainer extends Component {
	static propTypes = {
		authRequest: PropTypes.func,
		isFetching: PropTypes.bool,
		error: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
		user: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
	};

	render() {
		return (
			<AuthForm
				isFetching={this.props.isFetching}
				user={this.props.user}
				authRequest={this.props.authRequest}
				errorMessage={this.props.error}
			/>
		);
	}
}

const mapStateToProps = state => ({
	isFetching: state.auth.isFetching,
	user: state.auth.user,
	error: state.auth.error
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
)(AuthContainer);
