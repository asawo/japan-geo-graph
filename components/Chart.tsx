import { Bar } from 'react-chartjs-2'

export type ChartProps = {
  name: string
  data: {
    year: number
    value: number
  }[]
}

export const BarChart = ({ name, data }: ChartProps) => {
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
