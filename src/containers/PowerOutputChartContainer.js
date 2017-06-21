import {connect} from 'react-redux'
import PowerOutputChart from '../components/PowerOutputChart/PowerOutputChart';

const mapStateToProps = function (state) {
  return {
    panels: state.panels
  };
};

const PowerOutputChartContainer = connect(
  mapStateToProps,
  null
)(PowerOutputChart);

export default PowerOutputChartContainer;
