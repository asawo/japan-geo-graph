import type { FillLayer } from 'mapbox-gl'

// Highlighted prefecture polygons
export const PrefectureLayer: FillLayer = {
  id: 'prefectures',
  type: 'fill',
  paint: {
    'fill-outline-color': 'black',
    'fill-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#CC7A00',
      '#FFA500',
    ],
    'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      0.7,
      0.4,
    ],
  },
}
