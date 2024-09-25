import React, { useState } from 'react';
import GermanyMap from './components/GermanyMap';
import JobList from './components/JobList';
import { Switch, FormControlLabel, Typography } from '@mui/material';
import CitySearchBox from './components/CitySearchBox';

function App() {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);
  const [searchCity, setSearchCity] = useState(''); // For holding search input

  const handleJobSelect = (jobs) => {
    const filteredJobs = showRemoteOnly
      ? jobs.filter((job) => job.remote)
      : jobs;

    setSelectedJobs(filteredJobs); // Update the job list when a circle is clicked
  };

  const handleRemoteToggle = (event) => {
    setShowRemoteOnly(event.target.checked);
    setSelectedJobs((prevJobs) =>
      event.target.checked ? prevJobs.filter((job) => job.remote) : prevJobs
    );
  };

  const handleCitySelect = (city) => {
    setSearchCity(city);
  };

  return (
    <div className="App" style={{ position: 'relative' }}>
      {/* Search bar container */}
      <div id="search-container">
        <Typography variant="h6">Search Jobs</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={showRemoteOnly}
              onChange={handleRemoteToggle}
              color="primary"
            />
          }
          label="Remote Only"
        />
        {/* Search City TextBox */}
        <CitySearchBox onCitySelect={handleCitySelect} />
      </div>

      <div style={{ display: 'flex', marginTop: '80px' }}>
        {/* Map Container */}
        <div id="map-container" style={{ flex: 1 }}>
          <GermanyMap
            onJobSelect={handleJobSelect}
            showRemoteOnly={showRemoteOnly}
            searchCity={searchCity} // Pass the search query to the map
          />
        </div>

        {/* Job List */}
        <JobList selectedJobs={selectedJobs} />
      </div>
    </div>
  );
}

export default App;
