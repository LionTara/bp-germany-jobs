import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './reducers/jobReducer'; // Import your job reducer

const store = configureStore({
  reducer: {
    job: jobReducer, // Combine your reducers here
  },
});

export default store;
