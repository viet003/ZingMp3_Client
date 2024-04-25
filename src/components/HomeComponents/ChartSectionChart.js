import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { chart } from "chart.js/auto"
import { Line } from "react-chartjs-2"

const ChartSectionChart = ({ section }) => {

    const { RTChart } = useSelector(state => state.app)
    const [data, setData] = useState(null)

    const options = {
        responsive: true,
        pointRadius: 0,
        // aspectRatio: 5,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    display: false,
                    color: 'transparent',
                    beginAtZero: true,
                },
                grid: {
                    color: section ? 'rgba(255,255,255,0.3)' : '#91A3B0',
                    drawTicks: false,
                    drawBorder: false,
                },
                min: RTChart?.chart?.minScore,
                max: RTChart?.chart?.maxScore,
                border: {
                    dash: [3, 5],
                    color: 'transparent'
                },
            },
            x: {
                ticks: {
                    color: section ? '#F2F3F5' : '#91A3B0'
                },
                grid: {
                    color: 'transparent',
                    drawBorder: false,
                    display: false,
                },
                border: {
                    display: false
                },
            }
        },
        plugins: {
            legend: false
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    };



    useEffect(() => {
        const labels = RTChart?.chart?.times?.filter(item => +item?.hour % 2 !== 0)?.map(item => parseInt(item?.hour).toFixed(2))
        const datasets = [];
        if (RTChart?.chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: RTChart?.chart?.items[Object.keys(RTChart?.chart?.items)[i]].filter(item => +item?.hour % 2 !== 0)?.map(item => item?.counter),
                    borderWidth: 2,
                    tension: 0.2,
                    borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
                    pointBackgroundColor: "white",
                    pointeHoverRadius: 5,
                    pointBorderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
                    pointHoverBorderWidth: 5,
                    categoryPercentage: 10,
                    barPercentage: 10

                })
            }
            setData({ labels, datasets })
        }
        // console.log({
        //     labels, datasets
        // })
    }, [RTChart])

    return (
        <div className={`${section ? 'h-[85%] w-[95%]' : 'h-full w-full'} flex items-center justify-center`}>
            {
                data && <Line
                    height="350px"
                    data={data} options={options} />
            }
        </div>
    )
}

export default memo(ChartSectionChart)
