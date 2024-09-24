import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchJobs } from './store/jobActions';
import GermanyMap from './components/GermanyMap';
import MapWithCircles from './components/MapWithCircles';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Map of Germany</h1>
      <GermanyMap />
      <MapWithCircles />
      
    </div>
  );
}

export default App;
