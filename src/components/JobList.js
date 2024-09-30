import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const JobList = () => {
    const { selectedJobs = [] } = useSelector((state) => state.job);

    return (
        <div className='w-[30%] ml-[20px] mt-[20px] h-screen overflow-y-scroll 
  sm:w-full sm:ml-0 sm:mt-2 sm:h-[50vh]'>
            {selectedJobs.length > 0 ? (
                selectedJobs.map((job, idx) => (
                    <Card key={idx} className='mb-4 sm:mb-2'>
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: { xs: '12px', sm: '16px' }, 
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 3,
                                    textOverflow: 'ellipsis',
                                    lineHeight: '1.2em',
                                    maxHeight: '3.6em',
                                }}
                            >
                                {job.title}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                sx={{ fontSize: { xs: '10px', sm: '12px' } }}
                            >
                                {job.company}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontSize: { xs: '10px', sm: '12px' } }} 
                            >
                                Remote: {job.remote ? 'Yes' : 'No'}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    fontSize: { xs: '10px', sm: '12px' }, 
                                    marginTop: { xs: '5px', sm: '10px' } 
                                }}
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
