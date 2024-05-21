import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

export default function Chart4() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/samples')
            .then(response => {
                const formattedData = response.data.map(item => ({
                    label: item.sector,
                    value: item.relevance
                }));
                setData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const chartConfigs = {
        type: "doughnut3D", // The chart type
        width: "700", // Width of the chart
        height: "400", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
            // Chart Configuration
            chart: {
                //Set the chart caption
                caption: "Sector and Relevance",
                //Set the x-axis name
                theme: "fusion",
                animateClockwise: "1",
                startingAngle: "310",
                "centerLabelBold": "1",
                "showTooltip": "0",
                "decimals": "0",
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