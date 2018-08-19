import React from "react";

const taskArr = [
	{
		title: "Задание №1",
		task:
			"Есть массив [10, 20, 30]. Поменяйте местами 0 и 1 элементы, чтобы получилось [20, 10, 30]",
		link: "https://codepen.io/anon/pen/dqbJgQ?editors=0011"
	},
	{
		title: "Задание №2",
		task: `Есть массив [30, -5, 0, 10, 5]. Напишите функцию сортировки от
			наименьшего к наибольшему, результат [-5, 0, 5, 10, 30] . Не используйте
			стандартную функцию sort.`,
		link: "https://codepen.io/anon/pen/yxBpGM?editors=0011"
	},
	{
		title: "Задание №3",
		task: "Напишите свою реализацию bind.",
		link: "https://codepen.io/anon/pen/bxbazV?editors=1011"
	}
];

export default () => (
	<div className="additional-content">
		{taskArr.map(el => (
			<div key={el.title} className="additional-content__task-block">
				<h2 className="additional-content__title">{el.title}</h2>
				<p className="additional-content__task">
					{el.task}
					<a
						className="additional-content__link"
						href={el.link}
						target="_blank">
						Глянуть ответ
					</a>
				</p>
			</div>
		))}
		<h2 className="additional-content__ps">
			P.S Так же данный файл лежит в папке "Utils"
		</h2>
	</div>
);
