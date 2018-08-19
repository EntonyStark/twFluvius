import React from "react";

const loader = component => {
	// pending - flag - props
	return component.flag ? (
		<div className="loader">
			<div className="loader__cssload-speeding-wheel" />
		</div>
	) : (
		component.children
	);
};

export default loader;
