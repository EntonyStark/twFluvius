import React from "react";
import { Route, Redirect } from "react-router-dom";

import checkUser from "./Utils/checkUserInStorage";

const PrivateRoute = ({ component: Component, flag, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			const token = checkUser();
			if (!token) {
				return <Redirect to="/auth" />;
			} else {
				return <Component {...props} />;
			}
		}}
	/>
);

export default PrivateRoute;
