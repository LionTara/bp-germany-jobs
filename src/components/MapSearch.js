import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, Switch } from "@mui/material";
import { setSearchCity, toggleRemoteOnly } from "../store/jobs/JobsSlice";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { setMapOptions } from "../store/map/MapSlice";

const MapSearch = () => {
  const [focused, setFocused] = useState(false);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "de" },
    },
    debounce: 300,
  });

  const remoteOnly = useSelector((state) => state.job.remoteOnly);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setValue(e.target.value);
  };


  const handleSelect = async (description) => {
    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      dispatch(setMapOptions({ lat, lng, description, zoom: 10 }));
      clearSuggestions();
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };


  const item = (location) => {
    return (
      <div
        key={location.place_id}
        onClick={() => handleSelect(location.description)}
        className="cursor-pointer flex bg-white p-4 hover:bg-gray-200 dark:bg-[var(--brand-color)] z-[999999]"
      >
        {location.description}
      </div>
    );
  };
  const showDropdown = focused && data.length > 0;

  const toggle = (
    <div className="flex h-[32px] items-center justify-between">
      <FormControlLabel
        control={
          <Switch
            checked={remoteOnly}
            onChange={() => dispatch(toggleRemoteOnly())}
            color="primary"
          />
        }
        label="Remote Only"
      />
    </div>
  );

  return (
    <div className="absolute z-[99999] top-1 flex w-full justify-center">
      <div
        className={`relative ml-3 mr-5 mt-6 h-[45px] w-full bg-white md:w-[50%] ${showDropdown ? "rounded-t-lg" : "rounded-xl"
          } shadow-xl md:-translate-x-[20px]`}
      >
        <div className="absolute flex h-full items-center">
          <div className="ml-5 flex h-full items-center">
            <FiSearch size={25} />
          </div>
        </div>
        <div className="absolute -bottom-full flex h-full w-full items-center justify-between md:bottom-0 md:right-10 md:w-auto">
          {toggle}
        </div>
        <input
          onFocus={() => setFocused(true)}
          value={value}
          onChange={handleSearchChange}
          className={`h-full w-full pl-[70px] text-lg outline-none ${showDropdown ? "rounded-t-lg" : "rounded-lg"
            } bg-white transition-colors duration-300 focus:bg-slate-50 `}
          placeholder="Find a Plug..."
        />
        {showDropdown && (
          <div className="absolute max-h-[300px] w-full overflow-y-auto rounded-b-lg bg-white  z-[9999999]">
            {data.map((location) => item(location))}
          </div>
        )}
      </div>
      {focused && (
        <div
          className="absolute -z-10 h-[92vh] w-full"
          onClick={() => setFocused(false)}
        />
      )}
    </div>
  );
};

export default MapSearch;
