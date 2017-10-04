import {connect} from 'react-redux'
import {updateInputRadiances, updateStoredEnergies} from '../actions';
import App from '../components/App/App';

const mapStateToProps = function (state) {
  return {
    batteries: state.batteries,
    sidebarVisible: state.sidebarVisible,
    panels: state.panelCollection.panels
  };
};

const mapDispatchToProps = {
  updateStoredEnergies,
  updateInputRadiances
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
