import { MapBox } from '../components/MapBox'
import { GetStaticProps, NextPage } from 'next'

const API_KEY = process.env.NEXT_PUBLIC_RESAS_API_KEY || ''
const prefectureListUrl =
  'https://opendata.resas-portal.go.jp/api/v1/prefectures'
const requestHeader = { 'X-API-KEY': API_KEY }
const opts = { headers: requestHeader }

const populationTrendUrl = (code: number) =>
  `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${code}`

const Home: NextPage<{ graphData: GraphData[] }> = ({ graphData }) => {
  return <MapBox graphData={graphData} />
}

export type Prefecture = {
  prefCode: number
  prefName: string
}

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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(prefectureListUrl, opts)
    const parsedRes = await res.json()
    const prefectures = parsedRes.result as Prefecture[]
    const graphData = await Promise.all(
      prefectures.map(async (prefecture) => {
        const url = populationTrendUrl(prefecture.prefCode)
        const res = await fetch(url, opts)
        const parsedRes = await res.json()
        return {
          code: prefecture.prefCode,
          data: parsedRes.result.data,
        } as GraphData
      }),
    )
    return {
      props: {
        prefectures,
        graphData,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        prefectures: [{ prefCode: 0, prefName: 'not found' }],
        graphData: {},
      },
    }
  }
}

export default Home
