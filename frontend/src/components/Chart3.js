import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

export default function Chart3() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/samples')
            .then(response => {
                const formattedData = response.data.map(item => ({
                    label: item.end_year,
                    value: item.impact
                }));
                setData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const chartConfigs = {
        type: "line", // The chart type
        width: "400", // Width of the chart
        height: "400", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
            // Chart Configuration
            chart: {
                //Set the chart caption
                caption: "End Year and Impact",
                //Set the x-axis name
                xAxisName: "End year",
                //Set the y-axis name
                yAxisName: "Impact",
                //Set the theme for your chart
                theme: "fusion",
                lineThickness: "2"
            },
            // Chart Data
            data: data
        }
    };
    return (
        <div>
            <ReactFC {...chartConfigs} />
        </div>
    )
}