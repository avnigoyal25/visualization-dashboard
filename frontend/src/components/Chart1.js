import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

export default function Chart1() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/samples')
            .then(response => {
                const formattedData = response.data.map(item => ({
                    label: item.region,
                    value: item.intensity
                }));
                setData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const chartConfigs = {
        type: "column2d", // The chart type
        width: "400", // Width of the chart
        height: "400", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
            // Chart Configuration
            chart: {
                
                caption: "Intensity vs Region",
                xAxisName: "Region",
                yAxisName: "Intensity",
                theme: "fusion"
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