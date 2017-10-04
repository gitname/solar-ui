import {connect} from 'react-redux'
import {toggleSidebarVisibility, updateInputRadiances, updateStoredEnergies} from '../actions';
import App from '../components/App/App';

const mapStateToProps = function (state) {
  return {
    batteries: state.batteries,
    sidebarVisible: state.sidebarVisible,
    panels: state.panelCollection.panels
  };
};

const mapDispatchToProps = {
  toggleSidebarVisibility,
  updateStoredEnergies,
  updateInputRadiances
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
