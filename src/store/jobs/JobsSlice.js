import { createSlice } from "@reduxjs/toolkit";
import { fetchJobs } from "./JobsService";

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    selectedJobs: [],
    showRemoteOnly: false,
    searchCity: '', // For holding search input
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleRemoteOnly: (state) => {
      state.showRemoteOnly = !state.showRemoteOnly;
      // Filter the selected jobs if the toggle is turned on
      state.selectedJobs = state.showRemoteOnly 
        ? state.jobs.filter((job) => job.remote) 
        : state.jobs;
    },
    setSelectedJobs: (state, action) => {
      const jobs = action.payload;
      // Filter the jobs based on the showRemoteOnly toggle
      state.selectedJobs = state.showRemoteOnly 
        ? jobs.filter((job) => job.remote) 
        : jobs;
    },
    setSearchCity: (state, action) => {
      state.searchCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
        state.selectedJobs = state.showRemoteOnly 
          ? action.payload.filter((job) => job.remote)
          : action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleRemoteOnly, setSelectedJobs, setSearchCity } = jobsSlice.actions;
export default jobsSlice.reducer;
