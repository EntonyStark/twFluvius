export default (values, trueValues) => {
	const result = Object.keys(values)
		.map(el => (values[el] === trueValues[el] ? true : false))
		.filter(el => !el);
	return result.length === 0 ? true : false;
};
