import React, { useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from "react-redux";
import MapSearch from "./MapSearch";
import Markers from "./Markers";
import { fetchJobs } from "../store/jobs/JobsService";
import { TailSpin } from 'react-loader-spinner';

const containerStyle = {
  width: "100%",
  height: "100%",
  zIndex: 1000,
  display: "inline-block"
};

const GermanyMap = () => {
  const mapRef = useRef(null);
  const { status, error } = useSelector((state) => state.job);
  const { mapCenter, zoom } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Fetching jobs...');
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    if (mapRef.current) {
      console.log('Panning map to:', mapCenter);
      mapRef.current.panTo(mapCenter);
      mapRef.current.setZoom(zoom);
    }
  }, [mapCenter, zoom]);

  if (status === "loading") return (
    <div className="w-full h-full flex justify-center items-center">
      <TailSpin
        height="80"
        width="80"
        color="#1d76d2"
        ariaLabel="loading"
      />
    </div>
  );

  if (error) return (<div className="w-full h-full"><p>Error: {error}</p></div>);

  return (
    <div className="relative h-full w-full">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={['places']}
        loadingElement={<div style={{ height: `100%` }} />}
      >
        <MapSearch />
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={zoom}
          onLoad={(map) => {
            console.log('Map loaded:', map);
            mapRef.current = map;
          }}
          onError={(error) => {
            console.error('Map error:', error);
          }}
        >
          <Markers map={mapRef.current} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GermanyMap;