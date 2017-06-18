import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import palette from '../../lib/color';
import './SolarRadianceChart.css';

class SolarRadianceChart extends Component {
  constructor(props) {
    super(props);

    const solarRadiationValues = [
      .25,
      .35,
      .64,
      .135,
      .85,
      .64,
      .125,
      .115
    ];

    const highestSolarRadiationValue = Math.max.apply(null, solarRadiationValues);

    const xAxisLabel = 'Panel';

    const yAxisLabel = 'kW/m²';

    this.seriesLabel = 'Solar Radiance';

    this.barBackgroundColors = [
      palette.lightGreen,
      palette.lightGreen,
      palette.lightGreen,
      palette.lightGreen,
      palette.lightGreen,
      palette.lightGreen,
      palette.lightGreen,
      palette.lightGreen
    ];

    this.barBorderColors = [
      palette.lightGreen,
      palette.lightGreen,
      palette.lightGreen,
      palette.lightGreen,
      palette.lightGreen,
      palette.lightGreen,
      palette.lightGreen,
      palette.lightGreen
    ];

    this.panelNumbers = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8'
    ];

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
            suggestedMax: highestSolarRadiationValue
          }
        }]
      },
      tooltips: {
        callbacks: {
          // Display the series label as the tooltip title.
          title: function (tooltipItem, data) {
            const datasetIndex = tooltipItem[0].datasetIndex;
            return data.datasets[datasetIndex].label;
          },
          // Display a truncated version of the bar value as the tooltip value.
          label: function (tooltipItem, data) {
            const barValue = tooltipItem.yLabel,
              decimalPlaces = 2;
            return barValue.toFixed(decimalPlaces) + ' kW/m²';
          }
        }
      }
    };

    // Store these values in the component state so React re-renders the component whenever these values change.
    this.state = {
      solarRadiationValues: solarRadiationValues
    };
  }

  render() {
    // Construct the `data` object in the format the `Bar` component expects.
    const data = {
      labels: this.panelNumbers,
      datasets: [{
        label: this.seriesLabel,
        data: this.state.solarRadiationValues,
        backgroundColor: this.barBackgroundColors,
        borderColor: this.barBorderColors,
        hoverBackgroundColor: this.barBackgroundColors,
        hoverBorderColor: this.barBorderColors,
        borderWidth: 1
      }]
    };

    return (
      <div className='solar-radiance-chart--chart-wrapper'>
        <Bar data={data} options={this.options}/>
      </div>
    );
  }
}

export default SolarRadianceChart;
