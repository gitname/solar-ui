# Solar UI

## Introduction

Solar UI is an example user interface for a dashboard a solar panel company might provide to each of its customers, which those customers could use to manage their solar panel systems.

## Technologies

Solar UI was built using the following technologies:

* React (via [`create-react-app`](https://github.com/facebookincubator/create-react-app))
* Redux
* Semantic UI
* Chart.js
* Jest
* ECMAScript 2015/ES6

## Features

Solar UI has the following features:

* **Data Generation**: Continuously generates new solar panel input radiance values using constrained random number generation 
* **Data Relationships**: 
    * **Panel Input/Output**: When a solar panel is "enabled," its output current is calculated as a function of its input radiance
    * **Inverter Output**: The inverter output power is calculated as a function of the output power of all solar panels combined
* **Interactive Charts**: When the visitor hovers over a data point in a chart, the chart displays a tooltip containing information about that data point 
* **Interactive Table**: When the visitor clicks on an "Enabled" toggle slider, the associated solar panel will become enabled or disabled (whichever is the opposite of its previous state)
* **Responsive Layout**: 
    * **Stacked Panels**: On narrow screens, the various panels stack vertically
    * **Mobile Menu**: On narrow screens, a side navigation menu becomes available

\* Note: `output power` = `output voltage` × `output current`

## Limitations

Solar UI has the following limitations:

* **Lack of Hyperlink Destinations**: None of the hyperlinks—with one exception—point to anything. The exception is the "Fork on GitHub" button, which points to this repository on GitHub. In contrast, the "Solar Panels," "Inverters," and "Batteries" hyperlinks, for example, don't point to anything.
* **Static "Latest Events" content**: The "Latest Events" panel contains static content only. In other words, the content does not change over time or in response to any events occurring.
* **Independent "Energy Storage" values**: Although they do change over time, the values depicted in the "Energy Storage" chart are independent of any other values shown in the UI, such as the "Solar Radiance" values or the "Power Output" values.

## Demo
 
You can explore a live version of Solar UI at the following URL:

https://gitname.github.io/solar-ui/