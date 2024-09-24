import axios from 'axios';

export const fetchJobs = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_JOBS_REQUEST' });
    try {
      const response = await axios.get('https://www.arbeitnow.com/api/job-board-api');
      
      // Filter jobs located in Germany (if needed)
      const jobsInGermany = response.data.data.filter(job => job.location); 

      // Dispatch the filtered data
      dispatch({ type: 'FETCH_JOBS_SUCCESS', payload: jobsInGermany });
      console.log(jobsInGermany); // Log the filtered data for debugging
    } catch (error) {
      dispatch({ type: 'FETCH_JOBS_FAILURE', payload: error.message });
    }
  };
};
