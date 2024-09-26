import React from 'react';
import GermanyMap from './components/GermanyMap';
import JobList from './components/JobList';
import { Switch, FormControlLabel, Typography } from '@mui/material';
import CitySearchBox from './components/CitySearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRemoteOnly } from './store/jobs/JobsSlice';

function App() {
  const dispatch = useDispatch();
  const { selectedJobs=[], remoteOnly,setSearchCity } = useSelector((state) => state.job);

  const handleRemoteToggle = (event) => {
    dispatch(toggleRemoteOnly());
  };

  const handleCitySelect = (city) => {
    dispatch(setSearchCity(city));
  };

  return (
    <div className="h-full w-full flex">
        <div className='flex-1 w-full' id="map-container" >
          <GermanyMap />
        </div>
        <JobList />
    </div>
  );
}

export default App;
