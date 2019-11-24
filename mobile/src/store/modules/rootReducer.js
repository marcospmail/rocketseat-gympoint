import { combineReducers } from 'redux';

import auth from './auth/reducer';
import student from './student/reducer';

export default combineReducers({ auth, student });
