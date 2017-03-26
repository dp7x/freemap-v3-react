import React from 'react';
import { Polyline as LeafletPolyline } from 'react-leaflet';

export default function Polyline({ searchResult }) {
  const latlongs = searchResult.geojson.coordinates.map(latlon => L.latLng(latlon[1], latlon[0]));

  return <LeafletPolyline positions={latlongs} interactive={false} weight={8} />;
}

Polyline.propTypes = {
  searchResult: React.PropTypes.any,
};
