import React, { useState } from 'react';
import GermanyMap from './components/GermanyMap';

function App() {
  const [selectedJobs, setSelectedJobs] = useState([]);

  const handleJobSelect = (jobs) => {
    setSelectedJobs(jobs); // Update the job list when a circle is clicked
  };

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        {/* Map Container */}
        <div id="map-container" style={{ flex: 1 }}>
          <GermanyMap onJobSelect={handleJobSelect} />
        </div>

        {/* Job List Container */}
        <div id="job-list" style={{ flex: 1, marginLeft: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>Available Jobs</h3>
          <div id="job-cards">
            {selectedJobs.length > 0 ? (
              selectedJobs.map((job, idx) => (
                <div key={idx} className="job-card" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
                  <h4>{job.title}</h4>
                  <p>{job.company}</p>
                  <p>Remote: {job.remote ? 'Yes' : 'No'}</p>
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    View Job
                  </a>
                </div>
              ))
            ) : (
              <p>No jobs selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
