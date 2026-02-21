import 'mapbox-gl/dist/mapbox-gl.css'
import styles from '../styles/MapBox.module.css'
import { Graph } from './Tooltip'
import { GeoJSON } from 'geojson'
import { PrefectureLayer, PrefectureLineLayer } from './PrefectureLayer'
import Prefectures from '../assets/jp_prefs.json'
import { Map, Source, Layer, MapRef } from 'react-map-gl/mapbox'
import type { MapboxGeoJSONFeature, MapLayerMouseEvent } from 'mapbox-gl'
import { useCallback, useState, useRef, FC } from 'react'
import { GraphData } from '../pages'

const DEFAULT_LAT = 40
const DEFAULT_LNG = 137
const SOURCE_ID = 'prefectures-source'

type HoverInfo = {
  feature: MapboxGeoJSONFeature
  x: number
  y: number
}

type MapProps = {
  graphData: GraphData[]
}

export const MapBox: FC<MapProps> = ({ graphData }) => {
  const mapRef = useRef<MapRef>(null)
  const hoveredId = useRef<string | number | undefined>(undefined)
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>()
  const [cursor, setCursor] = useState<string>('auto')

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const {
      features,
      point: { x, y },
    } = event
    const map = mapRef.current
    if (!map) return

    if (hoveredId.current !== undefined) {
      map.setFeatureState(
        { source: SOURCE_ID, id: hoveredId.current },
        { hover: false },
      )
    }

    const hoveredFeature = features && features[0]
    if (hoveredFeature) {
      setHoverInfo({ feature: hoveredFeature, x, y })
      hoveredId.current = hoveredFeature.id
      if (hoveredFeature.id !== undefined) {
        map.setFeatureState(
          { source: SOURCE_ID, id: hoveredFeature.id },
          { hover: true },
        )
      }
      setCursor(`url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='20' viewBox='0 0 16 20'><path d='M8 0C3.6 0 0 3.6 0 8c0 5.4 8 12 8 12s8-6.6 8-12C16 3.6 12.4 0 8 0z' fill='%23469c8a'/><circle cx='8' cy='8' r='3' fill='%23000'/></svg>") 8 20, pointer`)
    } else {
      setCursor('auto')
    }
  }, [])

  const onMouseLeave = useCallback(() => {
    const map = mapRef.current
    if (map && hoveredId.current !== undefined) {
      map.setFeatureState(
        { source: SOURCE_ID, id: hoveredId.current },
        { hover: false },
      )
    }
    hoveredId.current = undefined
    setHoverInfo(undefined)
    setCursor('auto')
  }, [])

  return (
    <div className={styles.mapbox}>
      <Map
        ref={mapRef}
        minZoom={2}
        initialViewState={{
          latitude: DEFAULT_LAT,
          longitude: DEFAULT_LNG,
          zoom: 3.7,
        }}
        mapStyle="mapbox://styles/asawo/claol2aur000514lcxyjf9az5"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        interactiveLayerIds={['prefectures']}
        cursor={cursor}
        onMouseMove={onHover}
        onMouseLeave={onMouseLeave}
      >
        <Source id={SOURCE_ID} type="geojson" data={Prefectures as GeoJSON} promoteId="id">
          <Layer {...PrefectureLayer} />
          <Layer {...PrefectureLineLayer} />
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
