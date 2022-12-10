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
import { FC, useEffect, useState } from 'react'
import { BarChart } from './Chart'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type GraphProps = { data: GraphData; prefecture: string; x: number; y: number }

export const Graph: FC<GraphProps> = ({ data, prefecture, x, y }) => {
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 800px)').matches
  )

  const style = matches
    ? // Desktop screens
      { left: x - 250, top: y - 350, width: '500px' }
    : // Mobile screens
      { left: 5, top: 5, right: 5, width: 'auto' }

  const populationGraphData = data.data[0].data

  useEffect(() => {
    window
      .matchMedia('(min-width: 800px)')
      .addEventListener('change', (e) => setMatches(e.matches))
  }, [])

  return (
    <div className={styles.tooltip} style={style}>
      <BarChart name={prefecture} data={populationGraphData} />
    </div>
  )
}
