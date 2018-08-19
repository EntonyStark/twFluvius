import React, { Component, Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import PropTypes from "prop-types";

import { Modal } from "reactstrap";

import inputList from "../../Constants/Fields";
import { input, textArea } from "../common/formFunc";
import { required } from "../../Utils/validate";

import sprite from "../../Image/sprite.svg";

class WorkModal extends Component {
	state = { confirmMessage: false };

	submit = values => {
		this.props.event(values);
		this.closeHandler();
	};

	closeHandler = () => {
		this.props.closeModal();
		this.props.reset("workModal");
		this.setState({ confirmMessage: false });
	};

	successDelete = () => {
		this.props.removeEvent();
		this.closeHandler();
	};

	openConfirm = () => this.setState({ confirmMessage: true });
	closeConfirm = () => this.setState({ confirmMessage: false });

	render() {
		const { editFlag, isOpen } = this.props;

		let content = (
			<Fragment>
				<h3 className="auth-page__title">
					{editFlag ? "Просмотр события" : "Добавте событие"}
				</h3>

				{inputList.filter(el => el.id === 3).map(el => (
					<Field
						key={el.id}
						name={el.name}
						type={el.type}
						label={el.text}
						validate={[required]}
						className="auth-page__form-group"
						classNamelabel="auth-page__form-label"
						errorClass="auth-page__form-input--error"
						classNameinput="auth-page__form-input"
						component={input}
					/>
				))}
				<Field
					name="description"
					validate={[required]}
					label="Опишите ваше событие"
					className="auth-page__form-group"
					classNamelabel="auth-page__form-label"
					errorClass="auth-page__form-input--error"
					classNameinput="auth-page__form-input"
					component={textArea}
				/>
				<button className="auth-page__button" type="submit">
					Сохранить
				</button>
				{editFlag && (
					<div
						onClick={this.openConfirm}
						className="dialog-modal__delete-btn"
						title="Удалить">
						<svg className="dialog-modal__icon">
							<use xlinkHref={`${sprite}#icon-cross`} />
						</svg>
					</div>
				)}
			</Fragment>
		);
		if (this.state.confirmMessage) {
			content = (
				<div className="dialog-modal__confirm-box">
					<h1 className="dialog-modal__title">
						Вы уверены что хотите удалить событие ?
					</h1>
					<div className="dialog-modal__btn-box">
						<button
							className="dialog-modal__button"
							type="button"
							onClick={this.successDelete}>
							Да естественно
						</button>
						<button
							className="dialog-modal__button"
							onClick={this.closeConfirm}>
							Нет я еще подумаю
						</button>
					</div>
				</div>
			);
		}

		return (
			<Modal
				isOpen={isOpen}
				toggle={this.closeHandler}
				className="dialog-modal">
				<form
					className="auth-page__form"
					onSubmit={this.props.handleSubmit(this.submit)}>
					{content}
				</form>
			</Modal>
		);
	}
}
WorkModal.propTypes = {
	event: PropTypes.func,
	closeModal: PropTypes.func,
	handleSubmit: PropTypes.func,
	reset: PropTypes.func,
	removeEvent: PropTypes.func,
	isOpen: PropTypes.bool,
	editFlag: PropTypes.bool
};

export default reduxForm({ form: "workModal", enableReinitialize: true })(
	WorkModal
);
