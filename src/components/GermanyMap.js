import React, { useEffect, useState } from 'react';
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

const GermanyMap = ({ onJobSelect, showRemoteOnly, searchCity }) => {
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
      if (
        job.location &&
        (!showRemoteOnly || job.remote) &&
        (!searchCity.name || job.location === searchCity.name)
      ) {
        counts[job.location] = (counts[job.location] || 0) + 1;
      }
    });
    setJobCountsByCity(counts);
  }, [jobs, showRemoteOnly, searchCity]);

  const handleCircleClick = (cityJobs, city) => {
    const filteredCityJobs = showRemoteOnly
      ? cityJobs.filter(job => job.remote)
      : cityJobs;
    onJobSelect(filteredCityJobs);
    setActiveCity(city); // Set active city for InfoWindow display
  };

  const handleInfoWindowClose = () => {
    setActiveCity(null); // Close the InfoWindow
  };

  if (loading) return <p>Loading job data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <LoadScript googleMapsApiKey="AIzaSyCwjaukgG10qGC6V_qNwCFjsQGg5kC8RT0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={searchCity.lat ? { lat: searchCity.lat, lng: searchCity.lng } : center}
        zoom={searchCity.lat ? 10 : zoom}
      >
        {Object.keys(jobCountsByCity).map((city, idx) => {
          const cityJobs = jobs.filter(job => job.location === city && (!showRemoteOnly || job.remote)); 
          const firstJob = cityJobs[0]; 
  
          return (
            firstJob && firstJob.latitude && firstJob.longitude && (
              <React.Fragment key={idx}>
                <Circle
                  center={{ lat: firstJob.latitude, lng: firstJob.longitude }}
                  radius={10000}
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
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                  onClick={() => handleCircleClick(cityJobs, city)}
                />
                {activeCity === city && (
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
