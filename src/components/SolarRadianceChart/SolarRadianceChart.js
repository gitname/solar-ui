import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import palette from '../../lib/color';
import './SolarRadianceChart.css';

class SolarRadianceChart extends Component {
  constructor(props) {
    super(props);

    const xAxisLabel = 'Panel';

    const yAxisLabel = 'kW/m²';

    this.seriesLabel = 'Solar Radiance';

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
            suggestedMax: 1
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
  }

  determineBarColor(panel) {
    let color = palette.lightGray.setAlpha(0.1);
    if (panel.enabled === true) {
      color = palette.lightGreen;
    }
    return color;
  }

  render() {
    const panels = this.props.panels,
      panelIds = Object.keys(panels),
      inputRadiances = [],
      barColors = [];

    panelIds.forEach(function (panelId) {
      const panel = panels[panelId];
      inputRadiances.push(panel.inputRadiance);
      barColors.push(this.determineBarColor(panel));
    }.bind(this));

    // Construct the `data` object in the format the `Bar` component expects.
    const data = {
      labels: panelIds,
      datasets: [{
        label: this.seriesLabel,
        data: inputRadiances,
        backgroundColor: barColors,
        borderColor: barColors,
        hoverBackgroundColor: barColors,
        hoverBorderColor: barColors,
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
