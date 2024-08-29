import React, { useCallback, useEffect, useRef, useState } from 'react';
import { T_GeoErrors, T_GeoOptions, T_GeoPosition, T_GeoPositionCoords, T_GeoType } from '../types/types';

const useGeo = (geoType: T_GeoType, geoOptions?: T_GeoOptions, throttleLimit?: number) => {
  const options: T_GeoOptions = {
    enableHighAccuracy: false,
    timeout: 5000,
  };
  const mergedOptions = useRef<T_GeoOptions>({...options , ...geoOptions});

  const [coords, setCoords] = useState<T_GeoPositionCoords>({
    accuracy: 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 0,
    longitude: 0,
    speed: null,
  });
  const [timestamp, setTimestamp] = useState<number>(0);
  const [errors, setErrors] = useState<T_GeoErrors>();
  const watchGeo = useRef<number>();
  const inThrottleStatus = useRef<boolean>(false)

  const successGeo = useCallback((pos: T_GeoPosition) => {
    const { coords: { accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed }, timestamp } = pos
    if (geoType === "current") {
      setCoords({
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed,
      });
      setTimestamp(timestamp);
    } else {
      if (!inThrottleStatus.current) {
        inThrottleStatus.current = true
        setCoords({
          accuracy,
          altitude,
          altitudeAccuracy,
          heading,
          latitude,
          longitude,
          speed,
        });
        setTimestamp(timestamp);
        let throttleEditedLimit = throttleLimit;
        if (!throttleEditedLimit || throttleEditedLimit < 500) {
          throttleEditedLimit = 500
        }
        setTimeout(() => { inThrottleStatus.current = false }, throttleEditedLimit)
      }
    }
  }, [geoType, mergedOptions.current.enableHighAccuracy, mergedOptions.current.maximumAge, mergedOptions.current.timeout]);

  const errorGeo = useCallback((err: T_GeoErrors) => {
    setErrors({ code: err.code, message: err.message });
  }, []);

  const clearWatchGeo = useCallback(() => {
    if (watchGeo.current) {
      navigator.geolocation.clearWatch(watchGeo.current);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      if (geoType === 'current') {
        navigator.geolocation.getCurrentPosition(successGeo, errorGeo, mergedOptions.current);
      }
      if (geoType === 'watch') {
        const watchId = navigator.geolocation.watchPosition(successGeo, errorGeo, mergedOptions.current);
        watchGeo.current = watchId;
        return () => { clearWatchGeo(); };
      }
    } else {
      setErrors({ message: 'This device does not support GPS!' });
    }
  }, [geoType, mergedOptions.current]);

  return {
    coords,
    timestamp,
    errors,
    clearWatchGeo,
  };
};

export default useGeo;
