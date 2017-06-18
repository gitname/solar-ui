import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import palette from '../../lib/color';
import './PowerOutputChart.css';

class PowerOutputChart extends Component {
  constructor(props) {
    super(props);

    const powerValues = [5.3, 6.2, 5.3, 6.2, 5.3];

    const maximumPowerValue = 10;

    const xAxisLabel = 'Time (seconds)';

    const yAxisLabel = 'kW';

    this.initialPointRadius = 0;

    this.powerLineLabel = 'Power Output';

    this.powerLineBackgroundColor = palette.lightGreen.setAlpha(0);

    this.powerLineBorderColor = palette.lightGreen;

    this.timeLabels = ['-4', '-3', '-2', '-1', 'Now'];

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
            suggestedMax: maximumPowerValue
          }
        }]
      },
      tooltips: {
        callbacks: {
          // Display the line label as the tooltip title.
          title: function (tooltipItem, data) {
            const datasetIndex = tooltipItem[0].datasetIndex;
            return data.datasets[datasetIndex].label;
          },
          // Display a truncated version of the power value as the tooltip text.
          label: function (tooltipItem, data) {
            const powerValue = tooltipItem.yLabel;
            return powerValue.toFixed(1) + ' kW';
          }
        }
      }
    };

    // Store these values in the component state so React re-renders the component whenever these values change.
    this.state = {
      powerValues: powerValues,
      pointRadius: this.initialPointRadius
    };
  }

  emphasizePoints() {
    this.setState({
      pointRadius: this.initialPointRadius + 2
    });
  }

  deemphasizePoints() {
    this.setState({
      pointRadius: this.initialPointRadius
    });
  }

  render() {
    // Construct the `data` object in the format the `Line` component expects.
    const data = {
      labels: this.timeLabels,
      datasets: [{
        label: this.powerLineLabel,
        data: this.state.powerValues,
        backgroundColor: this.powerLineBackgroundColor,
        borderColor: this.powerLineBorderColor,
        borderWidth: 1,
        pointRadius: this.state.pointRadius
      }]
    };

    return (
      <div className='power-output-chart--chart-wrapper'
           onMouseEnter={this.emphasizePoints.bind(this)}
           onMouseLeave={this.deemphasizePoints.bind(this)}>
        <Line data={data} options={this.options}/>
      </div>
    );
  }
}

export default PowerOutputChart;
