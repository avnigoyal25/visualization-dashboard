import React, { useState } from 'react';
import '../css/customization.css';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import Line from "fusioncharts/fusioncharts.charts";
import SplineArea from "fusioncharts/fusioncharts.charts";
import Pie2D from "fusioncharts/fusioncharts.charts";
import Pie3D from "fusioncharts/fusioncharts.charts";
import Doughnut3D from "fusioncharts/fusioncharts.charts";
import Doughnut2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from 'axios';

ReactFC.fcRoot(FusionCharts, Column2D, Line, SplineArea, Pie2D, Pie3D, Doughnut3D, Doughnut2D, FusionTheme);

const chartTypeMapping = {
  'Bar graph': 'column2d',
  'Line graph': 'line',
  'Area graph': 'splinearea',
  '2D Pie chart': 'pie2d',
  '3D Pie chart': 'pie3d',
  'Doughnut3d': 'doughnut3d',
  'Doughnut2d': 'doughnut2d'
};

export default function Customization() {
  const [variable1, setVariable1] = useState('');
  const [variable2, setVariable2] = useState('');
  const [graphType, setGraphType] = useState('');
  const [chartData, setChartData] = useState([]);

  const handleVariable1Change = (event) => {
    setVariable1(event.target.value);
  };

  const handleVariable2Change = (event) => {
    setVariable2(event.target.value);
  };

  const handleGraphTypeChange = (event) => {
    setGraphType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchChartData();
  };

  const fetchChartData = () => {
    console.log("Fetching data...");
    axios.get('http://localhost:5000/api/samples')
      .then(response => {
        console.log("Fetched Data:", response.data);
        const formattedData = response.data.map(item => ({
          label: item[variable1],
          value: item[variable2]
        }));
        console.log("Formatted Data:", formattedData);
        setChartData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const chartConfigs = {
    type: chartTypeMapping[graphType], // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: `${variable1} vs ${variable2}`,
        subCaption: "",
        xAxisName: variable1,
        yAxisName: variable2,
        theme: "fusion"
      },
      // Chart Data
      data: chartData
    }
  };

  return (
    <div>
      <h2>Make your own graph!</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={variable1}
          onChange={handleVariable1Change}
        >
          <option value="">Select variable 1</option>
          <option value="end_year">End year</option>
          <option value="topic">Topic</option>
          <option value="sector">Sector</option>
          <option value="region">Region</option>
          <option value="pestle">PEST</option>
          <option value="source">SOURCE</option>
          <option value="country">Country</option>
          <option value="intensity">Intensity</option>
        </select>
        <select
          value={variable2}
          onChange={handleVariable2Change}
        >
          <option value="">Select variable 2</option>
          <option value="end_year">End year</option>
          <option value="topic">Topic</option>
          <option value="sector">Sector</option>
          <option value="region">Region</option>
          <option value="pestle">PEST</option>
          <option value="source">SOURCE</option>
          <option value="country">Country</option>
          <option value="intensity">Intensity</option>
        </select>
        <select
          value={graphType}
          onChange={handleGraphTypeChange}
        >
          <option value="">Select graph type</option>
          <option value="Bar graph">Bar graph</option>
          <option value="Line graph">Line graph</option>
          <option value="Area graph">Area graph</option>
          <option value="2D Pie chart">2D Pie chart</option>
          <option value="3D Pie chart">3D Pie chart</option>
          <option value="Doughnut3d">Doughnut3d</option>
          <option value="Doughnut2d">Doughnut2d</option>
        </select>
        <br />
        <button className='button-1' type="submit">Generate Graph</button>
      </form>
      <br />
      {chartData.length > 0 && <ReactFC {...chartConfigs} />}
    </div>
  );
}
