import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import MapSearch from './MapSearch';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { toggleRemoteOnly } from '../store/jobs/JobsSlice';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('use-places-autocomplete', () => ({
    __esModule: true,
    default: jest.fn(),
    getGeocode: jest.fn(),
    getLatLng: jest.fn(),
}));

describe('MapSearch Component', () => {
    let dispatchMock;
    let setValueMock;
    let clearSuggestionsMock;

    beforeEach(() => {
        dispatchMock = jest.fn();
        useDispatch.mockReturnValue(dispatchMock);
        useSelector.mockReturnValue(false);

        setValueMock = jest.fn();
        clearSuggestionsMock = jest.fn();
        usePlacesAutocomplete.mockReturnValue({
            ready: true,
            value: '',
            suggestions: { status: 'OK', data: [{ description: 'Berlin', place_id: '1' }] },
            setValue: setValueMock,
            clearSuggestions: clearSuggestionsMock,
        });
    });

    test('renders the search input', () => {
        render(<MapSearch />);
        const inputElement = screen.getByPlaceholderText('Find a Plug...');
        expect(inputElement).toBeInTheDocument();
    });

    test('displays "Remote Only" toggle', () => {
        render(<MapSearch />);
        const toggleLabel = screen.getByText(/Remote Only/i);
        expect(toggleLabel).toBeInTheDocument();
    });

    test('toggles "Remote Only" switch', () => {
        render(<MapSearch />);
        const toggleElement = screen.getByRole('checkbox');
        expect(toggleElement).not.toBeChecked();

        fireEvent.click(toggleElement);
        expect(dispatchMock).toHaveBeenCalledWith(toggleRemoteOnly());
    });

    test('allows input value to be changed', () => {
        render(<MapSearch />);
        const inputElement = screen.getByPlaceholderText('Find a Plug...');
        fireEvent.change(inputElement, { target: { value: 'Berlin' } });

        expect(setValueMock).toHaveBeenCalledWith('Berlin');
    });

});
