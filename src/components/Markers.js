import React, { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedJobs } from "../store/jobs/JobsSlice"
import { InfoWindow, Marker, MarkerClusterer } from '@react-google-maps/api';

const Markers = () => {
  const { jobs, showRemoteOnly, searchCity } = useSelector((state) => state.job)
  const dispatch = useDispatch()
  const [activeCity, setActiveCity] = useState(null)

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
    const filteredCityJobs = showRemoteOnly
      ? cityJobs.filter((job) => job.remote)
      : cityJobs
    dispatch(setSelectedJobs(filteredCityJobs))
    setActiveCity(city)
  }

  const handleInfoWindowClose = () => {
    setActiveCity(null)
  }

  return (
    <MarkerClusterer>
      {(clusterer) =>
        Object.keys(jobCountsByCity).map((city, idx) => {
          const cityJobs = jobs.filter(
            (job) => job.location === city && (!showRemoteOnly || job.remote)
          );
          const firstJob = cityJobs[0];

          return (
            firstJob &&
            firstJob.latitude &&
            firstJob.longitude && (
              <React.Fragment key={idx}>
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
                  icon={{
                    url: "data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='16' fill='%231976d2' stroke='%23FFFFFF' stroke-width='2'/></svg>",
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                  clusterer={clusterer}
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
          );
        })
      }
    </MarkerClusterer>
  );
};

export default Markers