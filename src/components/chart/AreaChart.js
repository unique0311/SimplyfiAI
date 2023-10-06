import React, { useContext, useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, Area } from "recharts";
import { StateContext } from "@/context/StateContext";

export default function AreaCharts() {
    const { token, phoneNumber, api_url } = useContext(StateContext);
    const [graphData, setGraphData] = useState([]);
    const dummyData = {
        "2023-09-27": {
            "totalProfit": 20,
            "value": 12
        },
        "2023-09-26": {
            "totalProfit": 12,
            "value": 24
        },
        "2023-09-25": {
            "totalProfit": 11,
            "value": 11
        },
        "2023-09-24": {
            "totalProfit": 12,
            "value": 14
        },
        "2023-09-23": {
            "totalProfit": 12,
            "value": 5
        },
        "2023-09-22": {
            "totalProfit": 7,
            "value": 8
        },
        "2023-09-21": {
            "totalProfit": 8,
            "value": 10
        }
    }
    const transformDataForChart = (serverData) => {
        const transformedData = [];
        for (const date in serverData) {
            if (serverData.hasOwnProperty(date)) {
                transformedData.push({
                    label: date,
                    totalProfit: serverData[date].totalProfit,
                    value: serverData[date].value,
                });
            }
        }
        return transformedData;
    };

    const generateGradientDefs = (data) => {
        return data.map((entry, index) => (
            <linearGradient
                key={index}
                id={`color${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
            >
                <stop offset="5%" stopColor={entry.color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={entry.stopColor} stopOpacity={0} />
            </linearGradient>
        ));
    };

    async function handleInventoryState() {
        let options = {
            headers: {
                authorization: `token ${token}`
            },
        };
        await fetch(`${api_url}/inventory/stats/${phoneNumber}`, options)
            .then((res) => res.json())
            .then((res) => {
                console.log(res.stats);
                const transformedData = transformDataForChart(res.stats.graph2);
                setGraphData(transformedData);
            })
            .catch((err) => console.log("error:" + err));
    }

    useEffect(() => {
        handleInventoryState();
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                height={200}
                width={440}
                data={graphData}
                margin={{
                    top: 0,
                    right: 0,
                    left: 35,
                    bottom: 0,
                }}
            >
                <defs>
                    {generateGradientDefs([
                        { color: "#7F56D9", stopColor: "#7F56D9" },
                        // Add more gradient data as needed
                    ])}
                </defs>
                <CartesianGrid strokeDasharray="1 0" vertical={false} stroke="#0000001A" strokeWidth={1} />
                <Tooltip />
                <XAxis tickLine={false} strokeOpacity={0} dataKey="label" tickMargin={12} stroke="#6D6D6E" />
                <YAxis strokeOpacity={0} tickMargin={12} tickFormatter={CustomTickFormatter1} stroke="#6D6D6E" />
                <Area
                    stroke="#7F56D9"
                    type="natural"
                    dataKey="totalProfit"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#color0)"
                    name="Total Profit"
                />
                <Area
                    stroke="#7F56D9"
                    type="natural"
                    dataKey="value"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#color1)"
                    name="Value"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export const CustomTickFormatter1 = (value) => {
    return `$ ${value.toString().substring(0, 4)}`;
};
