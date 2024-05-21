import React from 'react'
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import Chart4 from './Chart4';
import Customization from './Customization';
import Header from './Header';
import '../css/home.css';

export default function Home() {
    return (
        <div>
            <Header/>
            <h1>Dashboard</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Chart1 />
                <Chart2 />
            </div>
            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Chart3/>
                <Chart4/>
            </div>
            <br />
            <Customization/>
        </div>
    )
}
