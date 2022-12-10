import 'mapbox-gl/dist/mapbox-gl.css'
import styles from '../styles/MapBox.module.css'
import { Graph } from './Graph'
import { GeoJSON } from 'geojson'
import { PrefectureLayer } from './PrefectureLayer'
import Prefectures from '../assets/jp_prefs.json'
import { Map, Source, Layer, MapLayerMouseEvent } from 'react-map-gl'
import { useCallback, useState, FC } from 'react'
import { GraphData } from '../pages'

const DEFAULT_LAT = 40
const DEFAULT_LNG = 137

type HoverInfo = {
  feature: mapboxgl.MapboxGeoJSONFeature
  x: number
  y: number
}

type MapProps = {
  graphData: GraphData[]
}

export const MapBox: FC<MapProps> = ({ graphData }) => {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>()

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const {
      features,
      point: { x, y },
    } = event
    const hoveredFeature = features && features[0]

    if (hoveredFeature) {
      setHoverInfo({ feature: hoveredFeature, x, y })
    }
  }, [])

  return (
    <div className={styles.mapbox}>
      <Map
        minZoom={2}
        initialViewState={{
          latitude: DEFAULT_LAT,
          longitude: DEFAULT_LNG,
          zoom: 3.7,
        }}
        mapStyle="mapbox://styles/asawo/claol2aur000514lcxyjf9az5"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        interactiveLayerIds={['prefectures']}
        onMouseMove={onHover}
      >
        <Source type="geojson" data={Prefectures as GeoJSON}>
          <Layer {...PrefectureLayer} />
        </Source>
        {hoverInfo && hoverInfo.feature && hoverInfo.feature.properties && (
          <Graph
            prefecture={hoverInfo.feature.properties.name}
            data={graphData[hoverInfo.feature.properties.id - 1]}
            x={hoverInfo.x}
            y={hoverInfo.y}
          />
        )}
      </Map>
    </div>
  )
}
