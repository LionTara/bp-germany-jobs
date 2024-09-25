import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { TextField } from '@mui/material';

const CitySearchBox = ({ onCitySelect }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search boundaries here if needed, e.g. Germany */
      componentRestrictions: { country: 'de' }, // Restrict to Germany
    },
    debounce: 300,
  });

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSelectSuggestion = async (description) => {
    setValue(description, false); // Set input to selected city
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      onCitySelect({ name: description, lat, lng }); // Send selected city name and coordinates to parent
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <TextField
        label="Search City"
        value={value}
        onChange={handleInputChange}
        fullWidth
        disabled={!ready}
        variant="outlined"
        margin="normal"
      />
      {status === 'OK' && (
        <ul style={{ position: 'absolute', zIndex: 1000, listStyle: 'none', padding: 0 }}>
          {data.map((suggestion) => (
            <li key={suggestion.place_id} onClick={() => handleSelectSuggestion(suggestion.description)}>
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearchBox;
