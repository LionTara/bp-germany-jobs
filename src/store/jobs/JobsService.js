import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await axios.get('https://www.arbeitnow.com/api/job-board-api');
  const jobs = response.data.data.filter(job => job.location);

  const geocodedJobs = await Promise.all(jobs.map(async (job) => {
    try {
      const geoResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(job.location)},Germany&key=AIzaSyCwjaukgG10qGC6V_qNwCFjsQGg5kC8RT0`
      );

      if (geoResponse.data.results && geoResponse.data.results.length > 0) {
        const location = geoResponse.data.results[0].geometry.location;
        return {
          ...job,
          latitude: location.lat,
          longitude: location.lng,
        };
      } else {
        console.error(`Geocoding failed for ${job.location}. Full response:`, geoResponse.data);
        return { ...job, latitude: null, longitude: null };
      }
    } catch (error) {
      console.error(`Error fetching geocode for ${job.location}:`, error.response ? error.response.data : error.message);
      return { ...job, latitude: null, longitude: null };
    }
  }));

  return geocodedJobs;
});
