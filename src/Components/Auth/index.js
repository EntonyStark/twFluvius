import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import PropTypes from "prop-types";

import inputList from "../../Constants/Fields";
import { input } from "../common/formFunc";
import { authValidate } from "../../Utils/validate";
import Loader from "../hoc/loader";

const authForm = props => {
	const { user, isFetching, errorMessage } = props;

	let message = null;
	if (errorMessage) {
		message = (
			<span className="auth-page__error-message">
				Неправльный логин или пароль
			</span>
		);
	}

	const submit = values => {
		props.authRequest(values);
	};

	return (
		<Fragment>
			{user && <Redirect to={{ pathname: "/calendar" }} push />}
			<div className="auth-page">
				<Loader flag={isFetching}>
					<form
						className="auth-page__form"
						onSubmit={props.handleSubmit(submit)}>
						<h3 className="auth-page__title">Форма авторизации</h3>
						{inputList.filter(el => el.id === 1 || el.id === 2).map(el => (
							<Field
								key={el.id}
								name={el.name}
								type={el.type}
								label={el.text}
								className="auth-page__form-group"
								classNamelabel="auth-page__form-label"
								errorClass="auth-page__form-input--error"
								classNameinput="auth-page__form-input"
								component={input}
							/>
						))}
						{message}
						<button className="auth-page__button" type="submit">
							Вход
						</button>
					</form>
				</Loader>
			</div>
		</Fragment>
	);
};
authForm.propTypes = {
	isFetching: PropTypes.bool,
	authRequest: PropTypes.func,
	handleSubmit: PropTypes.func,
	user: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
	errorMessage: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default reduxForm({ form: "authForm", validate: authValidate })(
	authForm
);
