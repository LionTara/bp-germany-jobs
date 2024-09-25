import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const JobList = ({ selectedJobs }) => {
  return (
    <div
      style={{
        width: '300px', // Fixed width for the job list
        marginLeft: '20px', // Some spacing between the map and job list
        marginTop: '20px',
      }}
    >
      {selectedJobs.length > 0 ? (
        selectedJobs.map((job, idx) => (
          <Card key={idx} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h5">{job.title}</Typography>
              <Typography color="textSecondary">{job.company}</Typography>
              <Typography variant="body2">
                Remote: {job.remote ? 'Yes' : 'No'}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: '10px' }}
              >
                View Job
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No jobs selected</Typography>
      )}
    </div>
  );
};

export default JobList;
