import React from 'react';
import ReactMapGL  from 'react-map-gl';

const MapContainer = () => {
  const [viewport, setViewport] = React.useState({
    latitude: 23.777176,
    longitude: 90.399452,
    zoom: 12
  });
  const key= 'pk.eyJ1IjoiZm9raHJ1bGlzbGFtIiwiYSI6ImNrbWh4ZmZ6ZzA3bHAyd256bmRtdTBzdDYifQ.0rVx5jn0ezIkYUZ544voJg';

  return (
    <ReactMapGL mapboxApiAccessToken={key}
      {...viewport}
      width="100%"
      height="100vh"
      onViewportChange={(viewport) => setViewport(viewport)}
    />
  );
};

export default MapContainer;
