import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch jobs
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const url = `/api/job-board-api/jobs`; // Notice no domain, as it's proxied
  const response = await axios.get(url);
  return response.data;
});
const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    remoteOnly: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleRemoteOnly: (state) => {
      state.remoteOnly = !state.remoteOnly;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload; // Store the fetched jobs
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleRemoteOnly } = jobsSlice.actions;
export default jobsSlice.reducer;
