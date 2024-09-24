import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { fetchJobs } from "../store/jobActions"; // Adjust the path as necessary
import 'leaflet/dist/leaflet.css';

const MapWithCircles = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job.jobs); // Corrected
  const loading = useSelector((state) => state.job.loading); // Adjust to match your state structure
  const error = useSelector((state) => state.job.error); // Adjust to match your state structure

  // Fetch jobs data on mount
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const getCityCoordinates = (city) => {
    // Define a mapping between cities and their lat/lng coordinates
    const cityCoordinates = {
      Berlin: [52.52, 13.405],
      Hamburg: [53.5511, 9.9937],
      Munich: [48.1351, 11.582],
      Frankfurt: [50.1109, 8.6821],
      // Add more cities as needed
    };
    return cityCoordinates[city] || [51.1657, 10.4515]; // Default to Germany's center if city not found
  };

  return (
    <div>
      {loading && <p>Loading job data...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && jobs.length > 0 && (
        <MapContainer center={[51.1657, 10.4515]} zoom={6} style={{ height: "500px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {jobs.map((job, idx) => {
            const coords = getCityCoordinates(job.location);
            return (
              <CircleMarker
                key={idx}
                center={coords}
                radius={5} // You can scale this based on job count or importance
                fillOpacity={0.5}
                color="blue"
              >
                <Tooltip direction="top" offset={[0, -5]} opacity={1}>
                  <span>{`${job.location}: ${job.title}`}</span>
                </Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
};

export default MapWithCircles;
