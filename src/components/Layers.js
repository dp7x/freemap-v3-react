import React from 'react';
import { TileLayer, LayersControl } from 'react-leaflet';
import { BingLayer } from 'react-leaflet-bing';

import { baseLayers, overlayLayers } from 'fm3/mapDefinitions';
import * as FmPropTypes from 'fm3/propTypes';

export default function Layers({ onMapChange, onOverlaysChange, tileFormat, overlays, mapType, overlayOpacity }) {
  // eslint-disable-next-line
  function getTileLayer({ type, url, attribution, maxZoom, minZoom }) {
    if (type === 'S') {
      return (<BingLayer
        bingkey="AuoNV1YBdiEnvsK1n4IALvpTePlzMXmn2pnLN5BvH0tdM6GujRxqbSOAYALZZptW"
        onAdd={() => handleAdd(type)}
        onRemove={() => handleRemove(type)}
      />);
    }
    const opacity = overlayOpacity[type] || 1.0;

    return (<TileLayer
      attribution={attribution}
      url={url.replace('{tileFormat}', tileFormat)}
      onAdd={() => handleAdd(type)}
      onRemove={() => handleRemove(type)}
      maxZoom={maxZoom} minZoom={minZoom}
      opacity={opacity}
    />);
  }

  function handleAdd(type) {
    if (baseLayers.some(x => x.type === type)) {
      onMapChange(type);
    } else {
      const next = new Set(overlays);
      next.add(type);
      onOverlaysChange([...next]);
    }
  }

  function handleRemove(type) {
    if (overlayLayers.some(x => x.type === type)) {
      const next = [...overlays];
      next.splice(next.indexOf(type));
      onOverlaysChange(next);
    }
  }

  return (
    <LayersControl position="topright">
      {
        baseLayers.map((item) => {
          const { type, name } = item;
          return (
            <LayersControl.BaseLayer key={type} name={name} checked={mapType === type}>
              {getTileLayer(item)}
            </LayersControl.BaseLayer>
          );
        })
      }
      {
        overlayLayers && overlayLayers.map((item) => {
          const { type, name } = item;
          return (
            <LayersControl.Overlay key={type} name={name} checked={overlays.indexOf(type) !== -1}>
              {getTileLayer(item)}
            </LayersControl.Overlay>
          );
        })
      }
    </LayersControl>
  );
}

Layers.propTypes = {
  onMapChange: React.PropTypes.func.isRequired,
  onOverlaysChange: React.PropTypes.func.isRequired,
  tileFormat: FmPropTypes.tileFormat.isRequired,
  overlays: FmPropTypes.overlays,
  mapType: FmPropTypes.mapType.isRequired,
  overlayOpacity: React.PropTypes.number.isRequired,
};
