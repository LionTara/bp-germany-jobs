// AIzaSyCwjaukgG10qGC6V_qNwCFjsQGg5kC8RT0

import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Circle, InfoWindow, Marker } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../store/jobActions';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 51.1657,
  lng: 10.4515,
};

const zoom = 6;

const GermanyMap = ({ onJobSelect }) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job.jobs);
  const loading = useSelector((state) => state.job.loading);
  const error = useSelector((state) => state.job.error);
  
  const [jobCountsByCity, setJobCountsByCity] = useState({});
  const [activeCity, setActiveCity] = useState(null); // For showing InfoWindow only for the clicked city

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    const counts = {};
    jobs.forEach(job => {
      if (job.location) {
        counts[job.location] = (counts[job.location] || 0) + 1;
      }
    });
    setJobCountsByCity(counts);
  }, [jobs]);

  const handleCircleClick = (cityJobs, city) => {
    onJobSelect(cityJobs);
    setActiveCity(city); // Set active city for InfoWindow display
  };

  const handleInfoWindowClose = () => {
    setActiveCity(null); // Close the InfoWindow
  };

  if (loading) return <p>Loading job data...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <LoadScript googleMapsApiKey="AIzaSyCwjaukgG10qGC6V_qNwCFjsQGg5kC8RT0">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        {Object.keys(jobCountsByCity).map((city, idx) => {
          const cityJobs = jobs.filter(job => job.location === city); 
          const firstJob = cityJobs[0]; 
  
          return (
            firstJob && firstJob.latitude && firstJob.longitude && (
              <React.Fragment key={idx}>
                <Circle
                  center={{ lat: firstJob.latitude, lng: firstJob.longitude }}
                  radius={10000} // Increase radius for larger circles
                  options={{
                    strokeColor: '#00f',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#00f',
                    fillOpacity: 0.35,
                  }}
                  onClick={() => handleCircleClick(cityJobs, city)}
                />
                <Marker
                  position={{ lat: firstJob.latitude, lng: firstJob.longitude }}
                  label={{
                    text: jobCountsByCity[city].toString(),
                    color: "#FFFFFF", // Set label color
                    fontWeight: "bold", // Set label font weight
                    fontSize: "14px", // Set label font size
                  }}
                  onClick={() => handleCircleClick(cityJobs, city)} // Optional: make the marker clickable
                />
                {activeCity === city && ( // Show InfoWindow only for the active city
                  <InfoWindow
                    position={{ lat: firstJob.latitude, lng: firstJob.longitude }}
                    onCloseClick={handleInfoWindowClose}
                  >
                    <div>
                      <h4>{city}</h4>
                      <p>{jobCountsByCity[city]} opened position(s)</p>
                    </div>
                  </InfoWindow>
                )}
              </React.Fragment>
            )
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
  
};

export default GermanyMap;
