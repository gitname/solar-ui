import {combineReducers} from 'redux';
import sidebarVisibilityReducer from './sidebarVisibilityReducer';

const combinedReducer = combineReducers({
  sidebarVisible: sidebarVisibilityReducer
});

export default combinedReducer;