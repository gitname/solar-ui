import {connect} from 'react-redux'
import SolarRadianceChart from '../components/SolarRadianceChart/SolarRadianceChart';

const mapStateToProps = function (state) {
  return {
    panels: state.panelCollection.panels
  };
};

const SolarRadianceChartContainer = connect(
  mapStateToProps,
  null
)(SolarRadianceChart);

export default SolarRadianceChartContainer;
