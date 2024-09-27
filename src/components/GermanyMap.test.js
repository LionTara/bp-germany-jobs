import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import GermanyMap from './GermanyMap';
import { fetchJobs } from '../store/jobs/JobsService';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('@react-google-maps/api', () => ({
    GoogleMap: ({ onLoad }) => {
        const mapRefMock = { panTo: jest.fn(), setZoom: jest.fn() };
        if (onLoad) onLoad(mapRefMock);
        return <div>GoogleMap</div>;
    },
    LoadScript: ({ children }) => <div>{children}</div>,
}));

jest.mock('../components/MapSearch', () => () => <div>MapSearch</div>);
jest.mock('../components/Markers', () => () => <div>Markers</div>);

jest.mock('../store/jobs/JobsService', () => ({
    fetchJobs: jest.fn(),
}));

describe('GermanyMap Component', () => {
    let dispatchMock;

    beforeEach(() => {
        dispatchMock = jest.fn();
        useDispatch.mockReturnValue(dispatchMock);
        useSelector.mockImplementation((selectorFn) => {
            if (selectorFn.name === 'jobSelector') {
                return { status: 'idle', error: null };
            }
            return { mapCenter: { lat: 52.52, lng: 13.405 }, zoom: 8 };
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders map and dispatches fetchJobs on mount', async () => {
        render(<GermanyMap />);

        expect(screen.getByText('MapSearch')).toBeInTheDocument();
        expect(screen.getByText('GoogleMap')).toBeInTheDocument();

        await waitFor(() => {
            expect(dispatchMock).toHaveBeenCalledWith(fetchJobs());
        });
    });

    test('displays loading message when jobs are being fetched', () => {
        useSelector.mockReturnValueOnce({ status: 'loading', error: null });

        render(<GermanyMap />);

        expect(screen.getByText('Loading job data...')).toBeInTheDocument();
    });

    test('displays error message when there is an error', () => {
        useSelector.mockReturnValueOnce({ status: 'failed', error: 'Failed to fetch jobs' });

        render(<GermanyMap />);

        expect(screen.getByText('Error: Failed to fetch jobs')).toBeInTheDocument();
    });


});
