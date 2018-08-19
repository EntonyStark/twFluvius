export const required = value => (value ? false : true);

const checkEmail = email =>
	!email ||
	!/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);

const checkPassword = password =>
	!password || !/^[a-zA-Z0-9_-]{4,18}$/.test(password);

export const authValidate = values => {
	const { email, password } = values;
	const errors = {};

	if (checkEmail(email)) errors.email = true;
	if (checkPassword(password)) errors.password = true;
	return errors;
};
