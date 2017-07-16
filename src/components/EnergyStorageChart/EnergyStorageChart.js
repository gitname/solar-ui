import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import palette from '../../lib/color';
import './EnergyStorageChart.css';

class EnergyStorageChart extends Component {
  constructor(props) {
    super(props);

    // Introduction:
    //
    // The "occupied" bar refers to the bottom (green) bar, which represents the amount of energy stored in the battery.
    //
    // The "vacant" bar refers to the top (gray) bar, which represents the amount of additional energy that can fit in
    // the battery.
    //
    // In the chart, the stack (i.e. the "vacant" bar on top of the "occupied" bar) will represent an "energy container"
    // of which some portion is occupied (i.e. filled) and some portion is vacant (i.e. empty).

    const xAxisLabel = 'Battery';

    const yAxisLabel = 'kW⋅h';

    this.occupiedBarLabel = 'Energy Stored';

    this.vacantBarLabel = 'Free Space';

    this.occupiedBarBackgroundColors = [
      palette.lightGreen.toString(),
      palette.lightGreen.toString(),
      palette.lightGreen.toString()
    ];

    this.vacantBarBackgroundColors = [
      palette.lightGray.setAlpha(0.1).toString(),
      palette.lightGray.setAlpha(0.1).toString(),
      palette.lightGray.setAlpha(0.1).toString()
    ];

    this.options = {
      maintainAspectRatio: false,
      hover: {
        animationDuration: 0,
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
            suggestedMax: 15
          }
        }]
      },
      tooltips: {
        callbacks: {
          // Display the bar label as the tooltip title.
          title: (tooltipItem, data) => {
            const datasetIndex = tooltipItem[0].datasetIndex;
            return data.datasets[datasetIndex].label;
          },
          // Display a truncated version of the bar value as the tooltip value.
          label: (tooltipItem, data) => {
            const barValue = tooltipItem.yLabel;
            return barValue.toFixed(1) + ' kW⋅h';
          }
        }
      }
    };

    this.legend = {
      display: false
    };
  }

  render() {
    const batteries = this.props.batteries,
      batteryIds = [],
      storedEnergiesKWh = [],
      vacanciesKWh = [];

    batteries.forEach((battery) => {
      const storedEnergyKWh = battery.storedEnergyKWh,
        vacancyKWh = battery.energyCapacityKWh - storedEnergyKWh;

      batteryIds.push(battery.id);
      storedEnergiesKWh.push(storedEnergyKWh);
      vacanciesKWh.push(vacancyKWh)
    });

    // Construct the `data` object in the format the `Bar` component expects.
    const data = {
      labels: batteryIds,
      datasets: [{
        label: this.occupiedBarLabel,
        data: storedEnergiesKWh,
        backgroundColor: this.occupiedBarBackgroundColors,
        borderColor: this.occupiedBarBackgroundColors,
        borderWidth: 1
      }, {
        label: this.vacantBarLabel,
        data: vacanciesKWh,
        backgroundColor: this.vacantBarBackgroundColors,
        borderColor: this.vacantBarBackgroundColors,
        borderWidth: 1
      }]
    };

    return (
      <div className='energy-storage-chart--chart-wrapper'>
        <Bar data={data} options={this.options} legend={this.legend}/>
      </div>
    );
  }
}

export default EnergyStorageChart;
