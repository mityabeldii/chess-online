/*eslint-disable*/
import { combineReducers } from 'redux';

import UsersReducer from './users-reducer.js';

export const reducer = combineReducers({
    users: UsersReducer,
});

/*eslint-enable*/
