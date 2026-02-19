import { MapBox } from '../components/MapBox'
import { NextPage } from 'next'
import populationData from '../assets/population_data.json'

export type PopulationByYear = {
  label: string
  data: {
    year: number
    value: number
  }[]
}

export type GraphData = {
  code: number
  data: PopulationByYear[]
}

const Home: NextPage = () => {
  return <MapBox graphData={populationData as GraphData[]} />
}

export default Home
