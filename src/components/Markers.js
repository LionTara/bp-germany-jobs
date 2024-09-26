import React, { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedJobs } from "../store/jobs/JobsSlice"
import {  Circle, InfoWindow, Marker } from '@react-google-maps/api';

const Markers = () => {
  const { jobs, showRemoteOnly, searchCity } = useSelector((state) => state.job)
  const dispatch = useDispatch()
  const [activeCity, setActiveCity] = useState(null)

  // Calculate job counts for each city, based on filters
  const jobCountsByCity = useMemo(() => {
    const counts = {}
    jobs.forEach((job) => {
      if (
        job.location &&
        (!showRemoteOnly || job.remote) &&
        (!searchCity.name || job.location === searchCity.name)
      ) {
        counts[job.location] = (counts[job.location] || 0) + 1
      }
    })
    return counts
  }, [jobs, showRemoteOnly, searchCity])

  const handleCircleClick = (cityJobs, city) => {
    // Filter city jobs by remote setting
    const filteredCityJobs = showRemoteOnly
      ? cityJobs.filter((job) => job.remote)
      : cityJobs
    dispatch(setSelectedJobs(filteredCityJobs)) // Dispatch selected jobs to Redux store
    setActiveCity(city)
  }

  const handleInfoWindowClose = () => {
    setActiveCity(null)
  }

  return (
    <>
      {Object.keys(jobCountsByCity).map((city, idx) => {
        const cityJobs = jobs.filter(
          (job) => job.location === city && (!showRemoteOnly || job.remote)
        )
        const firstJob = cityJobs[0]

        return (
          firstJob &&
          firstJob.latitude &&
          firstJob.longitude && (
            <React.Fragment key={idx}>
              <Circle
                center={{
                  lat: firstJob.latitude,
                  lng: firstJob.longitude,
                }}
                radius={10000}
                options={{
                  strokeColor: "#00f",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#00f",
                  fillOpacity: 0.35,
                }}
                onClick={() => handleCircleClick(cityJobs, city)}
              />
              <Marker
                position={{
                  lat: firstJob.latitude,
                  lng: firstJob.longitude,
                }}
                label={{
                  text: jobCountsByCity[city].toString(),
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
                onClick={() => handleCircleClick(cityJobs, city)}
              />
              {activeCity === city && (
                <InfoWindow
                  position={{
                    lat: firstJob.latitude,
                    lng: firstJob.longitude,
                  }}
                  onCloseClick={handleInfoWindowClose}
                >
                  <div>
                    <h4>{city}</h4>
                    <p>{jobCountsByCity[city]} opened position(s)</p>
                  </div>
                </InfoWindow>
              )}
            </React.Fragment>
          )
        )
      })}
    </>
  )
}

export default Markers
