import React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = () => {
    return (
        <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAQP_VQDApvxu9kUqrqGyTFaVYi2iqbi6E"}}
          defaultCenter={{
            lat: 23.777176,
            lng: 90.399452
          }}
          defaultZoom = {10}
        >
        </GoogleMapReact>
      </div>
    );
};

export default GoogleMap;