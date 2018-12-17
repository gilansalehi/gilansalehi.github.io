import { combineReducers } from '../util/reduxLite.js';
import todos from './todos.js';

export const rootReducer = combineReducers({
	todos: todos,
});