import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import JobList from './JobList';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

describe('JobList Component', () => {
    it('renders without crashing when no jobs are available', () => {
        useSelector.mockReturnValue({ selectedJobs: [] });

        render(<JobList />);

        expect(screen.getByText(/no jobs selected/i)).toBeInTheDocument();
    });

    it('displays job titles and company names correctly', () => {
        useSelector.mockReturnValue({
            selectedJobs: [
                {
                    title: 'Nachunternehmer Trockenbau (m/w/d)',
                    company: 'Schmidt&Partner GmbH',
                    remote: false,
                    url: 'https://example.com'
                },
                {
                    title: 'Planungskoordinator / ZTV-ING Koordinator (m/w/d)',
                    company: 'Riverstate Premium Recruiting',
                    remote: false,
                    url: 'https://example.com'
                },
            ],
        });

        render(<JobList />);

        expect(screen.getByText(/Nachunternehmer Trockenbau/i)).toBeInTheDocument();
        expect(screen.getByText(/Schmidt&Partner GmbH/i)).toBeInTheDocument();
        expect(screen.getByText(/Planungskoordinator/i)).toBeInTheDocument();
        expect(screen.getByText(/Riverstate Premium Recruiting/i)).toBeInTheDocument();
    });

    it('displays the correct job URL', () => {
        useSelector.mockReturnValue({
            selectedJobs: [
                {
                    title: 'Job Title',
                    company: 'Company Name',
                    remote: false,
                    url: 'https://www.example.com'
                },
            ],
        });

        render(<JobList />);

        const viewJobButton = screen.getByRole('link', { name: /view job/i });
        expect(viewJobButton).toHaveAttribute('href', 'https://www.example.com');
    });

    it('displays remote job status correctly', () => {
        useSelector.mockReturnValue({
            selectedJobs: [
                {
                    title: 'Remote Job',
                    company: 'Remote Company',
                    remote: true,
                    url: 'https://www.example.com'
                },
            ],
        });

        render(<JobList />);

        expect(screen.getByText(/remote: yes/i)).toBeInTheDocument();
    });

    it('displays non-remote job status correctly', () => {
        useSelector.mockReturnValue({
            selectedJobs: [
                {
                    title: 'Onsite Job',
                    company: 'Onsite Company',
                    remote: false,
                    url: 'https://www.example.com'
                },
            ],
        });

        render(<JobList />);

        expect(screen.getByText(/remote: no/i)).toBeInTheDocument();
    });
});
