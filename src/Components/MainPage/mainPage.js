import React, { Component } from "react";
import PropTypes from "prop-types";

import { Jumbotron } from "reactstrap";

export default class extends Component {
	static propTypes = {
		history: PropTypes.object
	};

	redirect = () => {
		this.props.history.push("/add");
	};

	render() {
		return (
			<div className="main-page">
				<Jumbotron>
					<h1 className="display-3">Hello, world!</h1>
					<p className="lead">
						Привет всем! что бы посмотреть (тестовый вариант) основную часть
						задания придется авторизироваться, если у тебя не получается пытайся
						еще раз! Да прибудет с вами сила!
					</p>
					<hr className="my-2" />
					<p>Для просмотра первой части задания нажми на кнопочку :)</p>
					<button onClick={this.redirect} className="main-page__btn">
						Кнопка
					</button>
				</Jumbotron>
			</div>
		);
	}
}
