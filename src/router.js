import React from "react";
import { Route, Switch } from "react-router-dom";

import HeaderContainer from "./Containers/HeaderContainer";
import MainPageContainer from "./Components/MainPage/mainPage";
import Additional from "./Components/Additional/index";
import AuthContainer from "./Containers/AuthContainer";
import CalendarContainer from "./Containers/CalendarContainer";

import PrivateRoute from "./privateRoute";

const Routes = props => (
	<div className="container">
		<HeaderContainer />
		<Switch>
			<Route exact path="/" component={MainPageContainer} />
			<Route exact path="/auth" component={AuthContainer} />
			<Route exact path="/add" component={Additional} />
			<PrivateRoute exact path="/calendar" component={CalendarContainer} />
		</Switch>
	</div>
);

export default Routes;
