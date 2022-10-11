import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
const NetworkInsights = () => {

    const data = [
        {
            name: "VNETs",
            value: 69,
        },
        {
            name: "MSGs",
            value: 32,
        },
        {
            name: "Public IPs",
            value: 8,
            
        },
        
    ];

    return (
        <>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="value" fill="#8884d8" />
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>
        </>
    )
}

export default NetworkInsights