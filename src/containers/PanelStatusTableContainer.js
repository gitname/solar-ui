import {connect} from 'react-redux'
import {enablePanels, disablePanels} from '../actions';
import PanelStatusTable from '../components/PanelStatusTable/PanelStatusTable';

const mapStateToProps = function (state) {
  return {
    enabledPanelIds: state.enabledPanelIds
  };
};

const mapDispatchToProps = {
  enablePanels: enablePanels,
  disablePanels: disablePanels
};

const PanelStatusTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelStatusTable);

export default PanelStatusTableContainer;
