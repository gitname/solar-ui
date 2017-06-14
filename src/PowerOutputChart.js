import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import './PowerOutputChart.css';

class PowerOutputChart extends Component {
  constructor(props) {
    super(props);

    const powerValues = [5, 6, 6, 5, 5, 5, 6, 6, 6, 7];

    const maximumPowerValue = 10;

    const xAxisLabel = 'Time';

    const yAxisLabel = 'kW';

    this.powerLineBackgroundColor = 'rgba(65, 198, 94, 0.5)';

    this.powerLineBorderColor = 'rgba(163, 163, 163, 0.5)';

    this.timeLabels = ['', '', '', '', '', '', '', '', '', ''];

    this.options = {
      events: [],
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
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
      }
    };

    // Store these values in the component state so React re-renders the component whenever these values change.
    this.state = {
      powerValues: powerValues
    };
  }

  render() {
    // Construct the `data` object in the format the `Line` component expects.
    const data = {
      labels: this.timeLabels,
      datasets: [{
        data: this.state.powerValues,
        backgroundColor: this.powerLineBackgroundColor,
        borderColor: this.powerLineBorderColor,
        borderWidth: 1,
        pointRadius: 0
      }]
    };

    return (
      <div>
        <Line data={data} options={this.options}/>
      </div>
    );
  }
}

export default PowerOutputChart;
