import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import './EnergyStorageChart.css';

class EnergyStorageChart extends Component {
  constructor(props) {
    super(props);

    // Define the initial values of the bars.
    //
    // The "occupied" bar refers to the bottom (green) bar, which represents the amount of energy stored in the battery.
    // The "vacant" bar refers to the top (gray) bar, which represents the amount of additional energy that can fit in the battery.
    //
    // The bar "stack" is not, itself, a distinct bar; rather, it refers to the "vacant" bar stacked on top of the "occupied" bar.
    // The bar "stack" value = (the "vacant" bar value) + (the "occupied" bar value).

    const barStackValues = [
      13.5,
      13.5,
      6.4
    ];

    const highestBarStackValue = Math.max.apply(null, barStackValues);

    const occupiedBarInitialValues = [
      8.1,
      11.61,
      1.13
    ];

    const vacantBarInitialValues = occupiedBarInitialValues.map(function (value, index) {
      return barStackValues[index] - value;
    });

    const xAxisLabel = 'Battery';

    const yAxisLabel = 'kW⋅h';

    // Store these values in the component state so React re-renders the component whenever these values change.
    this.state = {
      occupiedBarValues: occupiedBarInitialValues,
      vacantBarValues: vacantBarInitialValues
    };

    this.occupiedBarBackgroundColors = [
      'rgba(65, 198, 94, 0.5)',
      'rgba(65, 198, 94, 0.5)',
      'rgba(65, 198, 94, 0.5)'
    ];

    this.vacantBarBackgroundColors = [
      'rgba(163, 163, 163, 0.25)',
      'rgba(163, 163, 163, 0.25)',
      'rgba(163, 163, 163, 0.25)'
    ];

    this.vacantBarBorderColors = [
      'rgba(163, 163, 163, 0.5)',
      'rgba(163, 163, 163, 0.5)',
      'rgba(163, 163, 163, 0.5)'
    ];

    this.barStackLabels = [
      '1',
      '2',
      '3'
    ];

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
          stacked: true,
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
          stacked: true,
          ticks: {
            beginAtZero: true,
            suggestedMax: highestBarStackValue
          }
        }]
      }
    };
  }

  render() {
    // Construct the `data` object in the format the `Bar` component expects.
    const data = {
      labels: this.barStackLabels,
      datasets: [{
        data: this.state.occupiedBarValues,
        backgroundColor: this.occupiedBarBackgroundColors,
        borderColor: this.vacantBarBorderColors,
        borderWidth: 1
      }, {
        data: this.state.vacantBarValues,
        backgroundColor: this.vacantBarBackgroundColors,
        borderColor: this.vacantBarBorderColors,
        borderWidth: 1
      }]
    };

    return (
      <div>
        <Bar data={data} options={this.options}/>
      </div>
    );
  }
}

export default EnergyStorageChart;
