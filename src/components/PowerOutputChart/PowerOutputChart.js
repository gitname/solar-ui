import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Line} from 'react-chartjs-2';
import palette from '../../lib/color';
import './PowerOutputChart.css';

class PowerOutputChart extends Component {
  constructor(props) {
    super(props);

    const xAxisLabel = 'Time';

    const yAxisLabel = 'kW';

    this.initialPointRadius = 2;

    this.powerLineLabel = 'Power Output';

    this.powerLineBackgroundColor = palette.lightGreen.setAlpha(0.1).toString();

    this.powerLineBorderColor = palette.lightGreen.toString();

    this.timeLabels = ['-5s', '', '', '', '', 'Now'];

    this.options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: xAxisLabel
          },
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: yAxisLabel
          },
          ticks: {
            beginAtZero: true,
            suggestedMax: 10
          }
        }]
      },
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0,
      },
      tooltips: {
        callbacks: {
          // Display the line label as the tooltip title.
          title: (tooltipItem, data) => {
            const datasetIndex = tooltipItem[0].datasetIndex;
            return data.datasets[datasetIndex].label;
          },
          // Display a truncated version of the power value as the tooltip text.
          label: (tooltipItem, data) => {
            const powerValue = tooltipItem.yLabel;
            return powerValue.toFixed(2) + ' kW';
          }
        }
      }
    };

    const initialTotalOutputPowerHistory = [null, null, null, null, null, null].map(() => {
      return PowerOutputChart.getTotalOutputPower(this.props.panels);
    });

    // Store these values in the component state so React re-renders the component whenever these values change.
    this.state = {
      totalOutputPowerHistory: initialTotalOutputPowerHistory,
      pointRadius: this.initialPointRadius
    };

    setInterval(this.updateTotalOutputPowerHistory.bind(this), 1000);
  }

  /**
   * Update the `totalOutputPowerHistory` property of the state, so it contains the newest output power value,
   * and no longer contains the oldest output power value.
   */
  updateTotalOutputPowerHistory() {
    this.setState((prevState, props) => {
      const totalOutputPowerHistory = prevState.totalOutputPowerHistory.concat();
      const totalOutputPower = PowerOutputChart.getTotalOutputPower(props.panels);
      totalOutputPowerHistory.shift();
      totalOutputPowerHistory.push(totalOutputPower);
      return {
        totalOutputPowerHistory: totalOutputPowerHistory
      };
    });
  }

  /**
   * Returns the total output power of all panels, combined.
   *
   * @param panels - An array containing `panel` objects.
   * @return {*} - A number representing the total output power.
   */
  static getTotalOutputPower(panels) {
    return panels.reduce((accumulator, panel) => {
      const outputPower = panel.outputVoltage * panel.outputCurrent;
      return accumulator + outputPower;
    }, 0);
  }

  render() {
    // Construct the `data` object in the format the `Line` component expects.
    const data = {
      labels: this.timeLabels,
      datasets: [{
        label: this.powerLineLabel,
        data: this.state.totalOutputPowerHistory,
        backgroundColor: this.powerLineBackgroundColor,
        borderColor: this.powerLineBorderColor,
        borderWidth: 1,
        pointBackgroundColor: this.powerLineBorderColor,
        pointRadius: this.state.pointRadius,
        pointHoverRadius: this.state.pointRadius
      }]
    };

    return (
      <div className='power-output-chart--chart-wrapper'>
        <Line data={data} options={this.options}/>
      </div>
    );
  }
}

PowerOutputChart.propTypes = {
  panels: PropTypes.array.isRequired,
};

export default PowerOutputChart;