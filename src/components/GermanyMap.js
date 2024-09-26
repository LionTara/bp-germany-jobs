import React, { useEffect, useState } from "react"
import { GoogleMap, LoadScript} from '@react-google-maps/api';

import { useDispatch, useSelector } from "react-redux"
import MapSearch from "./MapSearch"
import Markers from "./Markers"
import { fetchJobs } from "../store/jobs/JobsService"

const containerStyle = {
  width: "100%",
  height: "100%",
  zIndex:1000,
  display:"inline-block"
}


const GermanyMap = () => {

  // Use data from Redux store
  const { status, error } = useSelector(
    (state) => state.job
  )
  const {mapCenter,zoom}= useSelector(state=>state.map)


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchJobs
      ())
  }, [dispatch])


  if (status === "loading") return (<div className="w-full h-full">
    <p>Loading job data...</p>
  </div>)
  if (error) return( <div className="w-full h-full"><p>Error: {error}</p></div>)

  return (
      <div className="relative h-full w-full">
        <LoadScript googleMapsApiKey="AIzaSyCwjaukgG10qGC6V_qNwCFjsQGg5kC8RT0" libraries={['places']}>
          <MapSearch />
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={zoom}
          >
            <Markers/>
          </GoogleMap>
        </LoadScript>
      </div>
  )
}

export default GermanyMap
