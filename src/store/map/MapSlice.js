import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapCenter: {
    lat: 51.1657,
    lng: 10.4515,
  },
  zoom: 6,
  searchCity: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setMapOptions: (state, action) => {
      const { lat, lng, zoom } = action.payload;
      state.mapCenter = { lat, lng };
      state.zoom = zoom;
    },
    resetMap: (state) => {
      state.mapCenter = initialState.mapCenter;
      state.zoom = initialState.zoom;
    },
  },
});

export const { setMapOptions, setZoom, resetMap } = searchSlice.actions;
export default searchSlice.reducer;
