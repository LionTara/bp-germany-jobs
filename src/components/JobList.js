import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const JobList = () => {
  const { selectedJobs=[] } = useSelector((state) => state.job);

  return (
    <div
    className='w-[300px] ml-[20px] mt-[20px] h-screen overflow-y-scroll'
      // style={{
      //   width: '300px',
      //   marginLeft: '20px', 
      //   marginTop: '20px',
      // }}
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
