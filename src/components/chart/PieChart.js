import React from 'react'
import { PieChart, Pie, Sector, Cell } from "recharts";
const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
];
const COLORS = ['#6252DF', '#BEB9F9', '#9082FF'];
const RADIAN = Math.PI / 180;
export default function PieCharts() {
    return (
        <div className="relative flex items-center justify-center">
            <PieChart width={109} height={109}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={50}
                    innerRadius={39}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
            <span className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center text-xs font-inter font-semibold leading-[18px] text-white'>
                Text Here
            </span>
        </div>
    )
  }