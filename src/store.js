/* 3rd party libraries */
import * as redux from "redux";
import thunk from 'redux-thunk';

/* Local libraries */
import AppReducer from './ducks/AppReducer';

export const configure = (initialState = {}) => {
	const reducer = redux.combineReducers({
		AppReducer
	});

	const store = redux.createStore(
		reducer,
		initialState,
		redux.compose(
			redux.applyMiddleware(thunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	);

	return store;
};