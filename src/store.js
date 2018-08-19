import { createStore, applyMiddleware /* compose */ } from "redux";
import createSagaMiddleware from "redux-saga";
// import logger from "redux-logger";

import reducers from "./Reducers";
import rootSaga from "./Sagas";

// const composeEnhancers
// 	= process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const sagaMiddleware = createSagaMiddleware();

export default createStore(
	reducers,
	// composeEnhancers(applyMiddleware(logger, sagaMiddleware)),
	// applyMiddleware(logger, sagaMiddleware)
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
