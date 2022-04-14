import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const Location = () => {
  const [userInfo, setUserInfo] = useState({ country: '' })
  const dispatch = useDispatch()

  const fetchUserCoordinates = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
      })
    })
  }

  useEffect(() => {
    fetchGeolocation()
  }, [])

  const fetchGeolocation = async () => {
    const position = await fetchUserCoordinates()
    const openCageResponse = await axios.get(
      'https://api.opencagedata.com/geocode/v1/json',
      {
        params: {
          key: '173d229274d946708766616770f94b87',
          q: `${position.coords.latitude}+${position.coords.longitude}`,
        },
      },
    )

    setUserInfo({
      country: openCageResponse.data.results[0].components.country,
    })
  }

  dispatch({ type: 'SET_USER_COUNTRY', payload: userInfo.country })

  return <div data-cy="user-location">{userInfo.country}</div>
}

export default Location
