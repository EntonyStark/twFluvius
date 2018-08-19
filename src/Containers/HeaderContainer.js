import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { setUser } from "../Actions/authActions";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";

import logo from "../Image/logo.svg";
import checkUser from "../Utils/checkUserInStorage";

class HeaderContainer extends Component {
	static propTypes = {
		setUser: PropTypes.func,
		history: PropTypes.object,
		user: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
	};

	state = { isOpen: false };

	componentDidMount() {
		const user = checkUser();
		this.props.setUser(user);
	}

	toggle = () => {
		this.setState(prevState => ({ isOpen: !prevState.isOpen }));
	};

	logOut = () => {
		localStorage.removeItem("user");
		this.props.setUser(null);
		this.props.history.push("/");
	};

	render() {
		const { user } = this.props;
		let logInLogOut = (
			<Link className="header__link" to="/auth">
				Авторизация
			</Link>
		);
		if (user) {
			logInLogOut = (
				<button type="button" className="header__log-out" onClick={this.logOut}>
					Выход
				</button>
			);
		}
		return (
			<header className="header">
				<Navbar color="light" light expand="md">
					<img
						src={logo}
						className="header__logo"
						alt="logo"
						onClick={() => this.props.history.push("/")}
					/>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							{user && (
								<Link className="header__link" to="/calendar">
									Календарь
								</Link>
							)}
							{logInLogOut}
						</Nav>
					</Collapse>
				</Navbar>
			</header>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user
});
const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			setUser
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(HeaderContainer));
