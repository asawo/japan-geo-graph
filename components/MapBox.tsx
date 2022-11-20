import 'mapbox-gl/dist/mapbox-gl.css'
import { GeoJSON } from 'geojson'
import styles from '../styles/MapBox.module.css'
import Prefectures from '../assets/jp_prefs.json'
import Map, { Source, Layer, MapLayerMouseEvent } from 'react-map-gl'
import { useCallback, useState } from 'react'
import { PrefectureLayer } from './PrefectureLayer'
import { Graph } from './Graph'

const DEFAULT_LAT = 35.6809591
const DEFAULT_LNG = 139.7673068

type HoverInfo = {
  feature: mapboxgl.MapboxGeoJSONFeature
  x: number
  y: number
}

export const MapBox = () => {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>()

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    console.log({ event })
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
          zoom: 5,
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
            x={hoverInfo.x}
            y={hoverInfo.y}
          />
        )}
      </Map>
    </div>
  )
}
