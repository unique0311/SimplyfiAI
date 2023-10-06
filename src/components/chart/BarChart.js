import React, { PureComponent, useContext, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Text13 from '../Text/Text13';
import { StateContext } from '@/context/StateContext';

const data = [
    {
        name: 'Page A',
        category: 400,
        category1: 240,
        category2: 240,
    },
    {
        name: 'Page B',
        category: 300,
        category1: 139,
        category2: 240,
    },
    {
        name: 'Page C',
        category: 200,
        category1: 980,
        category2: 240,
    },
    {
        name: 'Page D',
        category: 278,
        category1: 398,
        category2: 240,
    },
    {
        name: 'Page E',
        category: 189,
        category1: 480,
        category2: 240,
    },
    {
        name: 'Page F',
        category: 239,
        category1: 380,
        category2: 240,
    },
    {
        name: 'Page G',
        category: 349,
        category1: 430,
    },
];

export default function BarCharts() {
    const { token, phoneNumber, api_url } = useContext(StateContext);
    const [state_data, setStateData] = useState(null);
    const [graphData, setGraphData] =useState([]);
    const transformServerDataToDefaultFormat = (serverData) => {
        const transformedData = [];
        for (const key in serverData) {
            if (serverData.hasOwnProperty(key) && key.startsWith('default')) {
                const { QuantityBought, QuantitySold, TotalProfit } = serverData[key];
                transformedData.push({
                    name: `Page ${key.slice(7)}`,
                    category: QuantityBought,
                    category1: QuantitySold,
                    category2: TotalProfit,
                });
            }
        }
    
        return transformedData;
    };
    async function handleInventoryState(){
        let options = {
            headers: {
                authorization: `token ${token}`
            },
        }
        await fetch(`${api_url}/inventory/stats/${phoneNumber}`,options)
        .then(res=>res.json())
          .then(res=>{            
            setStateData(res.stats);
            let response = res.stats.graph1;
            setGraphData(transformServerDataToDefaultFormat(response))
          })
          .catch(err=>console.log("error:" + err))
    }
    useEffect(()=>{
        handleInventoryState()
    },[]);
    // console.log("=========>inventoryState=======>",state_data)
    return (
        <div className='w-full xl:h-[200px]'>
            <ResponsiveContainer>
            <BarChart
                width={200}
                height={200}
                data={graphData}
                margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="1 0"
                    vertical={false}
                    stroke="#0000001A"
                    strokeWidth={1} />
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip 
                     content={CustomTooltip}
                     trigger={'hover'}
                     cursor={false}
                     wrapperStyle={{ outline: 'none' }}
                />
                <Legend
                    content={renderLegend}
                    iconSize={12}
                    iconType='square'
                    align='right'
                    verticalAlign="middle"
                    layout="vertical"
                />
                <Bar dataKey={"category"} fill="#6252DF" />
                <Bar dataKey="category1" fill="#9082FF" />
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
}
const CustomTooltip = ({ label, payload }) => {
    if (payload && payload.length) {
        return (
            <div className='border border-solid border-white/60 bg-[#29292B] flex flex-col items-center justify-between w-[52px] py-1.5 rounded'>
                <span className='text-[7px] font-inter font-medium leading-3 text-white/80'>
                category1
                </span>
                <span className='text-[7px] font-inter font-medium leading-3 text-white/80'>
                    {payload[0].payload["category"] || 0} Units
                </span>
            </div>
        )
    }
    return null;
}
const renderLegend = (props) => {
    const { payload } = props;
    return (
        <ul className='grid grid-cols-2 gap-3 items-center text-center justify-center'>
            {
                payload.map((entry, index) => (
                    <li key={`item-${index}`} className={`flex items-center gap-1 li${index}`}>
                        <div className={`w-3 h-3 flex rounded-ssm`} style={{ background: entry.color }}></div>
                        <Text13 title={entry.value} color="primary" />
                    </li>
                ))
            }
        </ul>
    );
}