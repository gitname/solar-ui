import {combineReducers} from 'redux';
import sidebarVisibilityReducer from './sidebarVisibilityReducer';
import panelEnablementReducer from './panelEnablementReducer';

const combinedReducer = combineReducers({
  // Note: For each reducer function we want to combine, we specify a key and a value.
  //
  // Each key defined here will become the key (on the `state` object passed to the `mapStateToProps` function in any
  // container component) at which we will be able to access the value returned by the associated reducer function.
  //
  // Each value is a reference to a reducer function.
  //
  sidebarVisible: sidebarVisibilityReducer,
  enabledPanelIds: panelEnablementReducer
});

export default combinedReducer;