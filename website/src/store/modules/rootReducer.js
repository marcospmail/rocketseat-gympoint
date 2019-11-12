import { combineReducers } from 'redux';

import auth from './auth/reducer';
import student from './student/reducer';
import navitem from './navitem/reducer';

export default combineReducers({ auth, student, navitem });
