import { combineReducers } from 'redux';
import commits from './commits';

const rootReducer = combineReducers({
    commits
});

export default rootReducer;
