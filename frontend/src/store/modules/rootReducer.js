import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import navitem from './navitem/reducer';

export default combineReducers({ auth, user, navitem });
