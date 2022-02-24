import React from 'react'
// import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, BarElement, LinearScale, CategoryScale, Tooltip, Legend)

export default function PositionChart({ CO2TokenBalance, tonsPledged, balances }) {
  let fightBalance = 0

  balances.forEach(balance => {
    fightBalance += balance / Math.pow(10, 18)
  })

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  }

  const chartData = {
    labels: ['Lifetime Pledged Pollution', 'Current Offsets/Positions'],
    datasets: [
      {
        label: 'CO2 tons',
        data: [
          tonsPledged > 0 ? (CO2TokenBalance / Math.pow(10, 18) + tonsPledged * 70).toFixed(2) : 0,
          fightBalance.toFixed(2),
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div style={{ width: 600, margin: 'auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  )
}
