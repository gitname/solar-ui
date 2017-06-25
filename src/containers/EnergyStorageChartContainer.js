import {connect} from 'react-redux'
import EnergyStorageChart from '../components/EnergyStorageChart/EnergyStorageChart';

const mapStateToProps = function (state) {
  return {
    batteries: state.batteries
  };
};

const EnergyStorageChartContainer = connect(
  mapStateToProps,
  null
)(EnergyStorageChart);

export default EnergyStorageChartContainer;
