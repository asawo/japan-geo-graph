import type { FillLayer } from 'react-map-gl'

// Highlighted prefecture polygons
export const PrefectureLayer: FillLayer = {
    id: 'prefectures',
    type: 'fill',
    paint: {
        'fill-outline-color': 'black',
        'fill-color': '#FFA500',
        'fill-opacity': 0.4,
    },
}
