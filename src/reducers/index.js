import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import auth from './authReducer';
import config from './configReducer';
import form from './formReducer';

export default combineReducers({
  auth, config, toastr: toastrReducer, form
})
