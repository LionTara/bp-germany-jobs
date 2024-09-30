import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const JobList = () => {
    const { selectedJobs = [] } = useSelector((state) => state.job);

    return (
        <div className="w-[30%] ml-[20px] mt-[20px] h-screen overflow-y-auto overflow-x-auto max-h-[calc(3*var(--line-height))]">
            <div className="line-clamp-3">
                {selectedJobs.length > 0 ? (
                    selectedJobs.map((job, idx) => (
                        <Card key={idx} style={{ marginBottom: '10px' }}>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '16px',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 3,
                                        textOverflow: 'ellipsis',
                                        lineHeight: '1.4em',
                                        maxHeight: '4.2em',
                                    }}
                                >
                                    {job.title}
                                </Typography>
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
                                    sx={{ marginTop: '10px' }}
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
        </div>
    );
};

export default JobList;
