import { Bar } from 'react-chartjs-2'
import { GraphData } from '../pages'
import styles from '../styles/MapBox.module.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type GraphProps = { data: GraphData; prefecture: string; x: number; y: number }

export const Graph = ({ data, prefecture, x, y }: GraphProps) => {
  if (!data) {
    return <h2 style={{ textAlign: 'center' }}>No data for {prefecture}</h2>
  }

  const populationGraphData = data.data[0].data
  return (
    <div
      className={styles.tooltip}
      style={{
        left: x,
        top: y,
      }}
    >
      <BarChart name={prefecture} data={populationGraphData} />
    </div>
  )
}

type ChartProps = {
  name: string
  data: {
    year: number
    value: number
  }[]
}

const BarChart = ({ name, data }: ChartProps) => {
  const dataset = {
    labels: data.map((d) => d.year),
    datasets: [
      {
        label: 'Population per year',
        data: data.map((d) => d.value),
        backgroundColor: '#469c8a',
      },
    ],
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: `Population per year`,
      },
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: 'center' }}>Population Chart for {name}</h2>
      <Bar data={dataset} options={options} />
    </div>
  )
}
