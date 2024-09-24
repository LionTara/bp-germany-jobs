import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 51.1657, // Latitude of Germany
  lng: 10.4515  // Longitude of Germany
};

const zoom = 6; // Zoom level for the map to focus on Germany

const GermanyMap = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCwjaukgG10qGC6V_qNwCFjsQGg5kC8RT0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        {/* Add any additional map features here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default GermanyMap;
