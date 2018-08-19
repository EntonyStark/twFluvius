import React from "react";

export const input = ({
	input: { ...inputProps },
	meta: { touched, error },
	label,
	className,
	classNamelabel,
	errorClass,
	classNameinput,
	type,
	id,
	...props
}) => (
	<div className={className}>
		<input
			type={type}
			className={
				touched && error ? `${classNameinput} ${errorClass}` : classNameinput
			}
			placeholder={label}
			autoComplete="off"
			id={id}
			{...inputProps}
		/>
		<label htmlFor={id} className={classNamelabel}>
			{label}
		</label>
	</div>
);

export const textArea = ({
	input: { ...inputProps },
	meta: { touched, error },
	label,
	className,
	classNamelabel,
	errorClass,
	classNameinput,
	id,
	...props
}) => (
	<div className={className}>
		<textarea
			type="textarea"
			className={
				touched && error ? `${classNameinput} ${errorClass}` : classNameinput
			}
			placeholder={label}
			autoComplete="off"
			id={id}
			{...inputProps}
		/>
		<label htmlFor={id} className={classNamelabel}>
			{label}
		</label>
	</div>
);
