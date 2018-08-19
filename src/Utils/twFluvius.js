//1. Есть массив [10, 20, 30].
//Поменяйте местами 0 и 1 элементы, чтобы получилось [20, 10, 30]

const list = [10, 20, 30];

const changeElements = list => {
	// your code
	// list[1] = list.splice(0, 1, list[1])[0]; // first option

	[list[0], list[1]] = [list[1], list[0]]; // second op	tion
};

changeElements(list);

console.log("1", list); // [20, 10, 30];

// 2. Есть массив [30, -5, 0, 10, 5].
// Напишите функцию сортировки от наименьшего к наибольшему, результат [-5, 0, 5, 10, 30] . Не используйте стандартную функцию sort.

const list2 = [30, -5, 0, 10, 5];

const mySort = list => {
	let generalArr = [];
	const funt = arr => {
		if (arr.length === 0) {
			return;
		} else {
			// let min = arr[0];
			// for (let i = 0; i < arr.length; i++) {
			// 	if (arr[i] < min) {
			// 		min = arr[i];
			// 	}
			// }                           // first option

			const min = Math.min.apply(Math, arr); // second option
			generalArr.push(min);
			const newArr = arr.filter(el => el !== min);
			funt(newArr);
		}
	};
	funt(list);
	return generalArr;
	// your code
};

const newList = mySort(list2);

console.log("2", newList); // [-5, 0, 5, 10, 30]

// 3. Напишите свою реализацию bind.

var func1 = function(message) {
	console.log("result", this + message);
};

var func2 = func1.bind("first ");
func2("test"); // alert 'Test'

// function myBind(func, context) {
// 	return function() {
// 		return func.apply(context, arguments);
// 	};
// }                    // first option

const myBind = (func, ...context) => {
	return (...rest) => {
		return func.apply(context, rest);
	};
}; // second option

const func3 = myBind(func1, "second ", "second 3", "second 4 ");
func3("Test"); // alert 'Test'
