import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
const OnTimeChart = () => {
    const [day, setDay] = useState("7d");
    const onClick = (title) => {
        setDay(title)
    };
    const [data, setData] = useState([
        {
            name: 'Proposals',
            data: [31, 40, 28, 51, 42, 43, 23],
            type: "area"
        },
    ]);
    useEffect(() => {
        setData([
            {
                name: 'Proposals',
                data: [10, 15, 23, 26, 32, 36, 23],
            },
        ])
    }, [day])
    const monthNames = [
        'Mo', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    ];
    const options = {
        colors: ['#FFF', '#474EEB', '#7177EC'],
        chart: {
            type: 'area',
            sparkline: true,
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            type: 'category',
            categories: monthNames,
            labels: {
                style: {
                    colors: '#FFFFFFA3',
                    fontFamily: 'Inter',
                },
            },
            tickPlacement: 'on'
        },
        grid: {
            borderColor: ''
        },
        yaxis: {
            labels: {
                show: false, // Hide y-axis data labels
            },
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm',
            },
        },
        legend: {
            offsetY: 0,
            labels: {
                colors: '#FFFFFF',
                useSeriesColors: false,
            },
            fontFamily: 'Inter',
            markers: {
                width: 8,
                height: 8
            },
        },
        markers: {
            size: 3
        }
    }
    return (
        <div className='flex flex-col mt-1'>
            <div className="flex items-center justify-between w-full px-2">
                <div className="flex items-center gap-2">
                    <button onClick={() => onClick("7d")}
                        className={`flex items-center justify-center text-center text-xs font-medium rounded-[48px] ${day === "7d" ? "bg-white text-background" : "bg-white/10 text-white/70"} py-[3px] px-[7px] outline-none border-none`}>
                        7d
                    </button>
                    <button onClick={() => onClick("1m")}
                        className={`flex items-center justify-center text-center text-xs font-medium  rounded-[48px] ${day === "1m" ? "bg-white text-background" : "bg-white/10 text-white/70"} py-[3px] px-[7px] outline-none border-none`}>
                        1m
                    </button>
                    <button onClick={() => onClick("All")}
                        className={`flex items-center justify-center text-center text-xs font-medium  rounded-[48px] ${day === "All" ? "bg-white text-background" : "bg-white/10 text-white/70"} py-[3px] px-[7px] outline-none border-none`} >
                        All
                    </button>
                    
                </div>
                <button onClick={() => onClick("Average")}
                    className={`flex items-center justify-center text-center text-xs font-medium rounded-[48px] ${day === "Average" ? "bg-white text-background" : "bg-white/10 text-white/70"} py-[3px] px-[7px] outline-none border-none`}
                >
                    Average
                </button>
            </div>
            <ReactApexChart
                options={options}
                series={data}
                type="area"
                height={150} />
        </div>
    )
}

export default OnTimeChart