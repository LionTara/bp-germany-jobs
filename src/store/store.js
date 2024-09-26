import { configureStore } from '@reduxjs/toolkit';
import JobsSlice from './jobs/JobsSlice'; 
import MapSlice from './map/MapSlice';

const store = configureStore({
  reducer: {
    job: JobsSlice, 
    map:MapSlice
  }
});

export default store;
