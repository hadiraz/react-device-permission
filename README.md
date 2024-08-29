[![npm version](https://img.shields.io/npm/v/react-device-permission.svg?style=flat-square)](https://www.npmjs.com/package/react-device-permission)  
[![license](https://img.shields.io/npm/l/react-device-permission.svg?style=flat-square)](https://github.com/hadiraz/react-device-permission/blob/main/LICENSE)

# [React Device Permission](https://github.com/hadiraz/react-device-permission) 🌍📸🎤

### Get microphone, camera, and geolocation(device location) access in a sec

This React hooks library simplifies handling device permissions and recording audio/video streams, as well as accessing geolocation data.

## Features ✨

- 🎥 Record video streams.
- 🎤 Record audio streams.
- 🌍 Access device geolocation.
- 🛠️ Simple and easy-to-use API.

## Installation 📦

```bash
npm install react-device-permission
```

## Usage 🚀

### `useRecord` Hook

This hook manages recording from the user's camera and/or microphone.

#### Arguments

| Argument Name  | Type              | Description                                                        |
| -------------- | ----------------- | ------------------------------------------------------------------ |
| `streamType`   | `T_StreamTypeProp`| The type of stream to capture (`"audio"`, `"video"`, `"audio/video"`).|
| `fileName`     | `string`          | The name of the file to be saved (without extension).               |

#### Returns

| Return Value              | Type                  | Description                                                           |
|---------------------------|-----------------------|-----------------------------------------------------------------------|
| `startRecording`          | `() => Promise<void>` | Function to start recording.                                          |
| `stopRecording`           | `() => Promise<void>` | Function to stop recording.                                           |
| `recordSrc`               | `string \| undefined` | The URL of the recorded media.                                        |
| `errors`                  | `Error \| undefined`  | Any errors that occur during recording.                               |
| `fileNameWithExtension`   | `string`              | The complete filename with the correct extension (e.g., `"my-video.webm"` or `"my-audio.ogg"`).|

### Example Usage for `useRecord`

```jsx
import React, { useEffect } from 'react';
import { useRecord } from 'react-device-permission';

const App = () => {
  const { startRecording, stopRecording, recordSrc, fileNameWithExtension, errors } = useRecord('video', 'my-video');

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      {recordSrc && (
        <a href={recordSrc} download={fileNameWithExtension}>
          Download Recording
        </a>
      )}
    </div>
  );
};

export default App;
```

### `useGeo` Hook

This hook provides a simple interface to access the user's geolocation.

#### Arguments

| Argument Name     | Type                         | Description                                                                       |
|-------------------|------------------------------|-----------------------------------------------------------------------------------|
| `geoType`         | `T_GeoType`                  | The type of geolocation request (`"watch"` for continuous tracking or `"current"` for one-time capture).|
| `geoOptions`      | `T_GeoOptions`               | Options for configuring the geolocation request.                                  |
| `throttleLimit`   | `number`                     | Optional. Throttle time in milliseconds for `"watch"` type to limit position updates.|

#### Returns

| Return Value       | Type                       | Description                                                      |
|--------------------|----------------------------|------------------------------------------------------------------|
| `coords`           | `T_GeoPositionCoords`      | An object containing latitude, longitude, and other position info.|
| `timestamp`        | `number`                   | Timestamp of the latest geolocation.                             |
| `errors`           | `T_GeoErrors`              | An object containing any errors that occurred during geolocation.|
| `clearWatchGeo`    | `() => void`               | Function to clear the watch position when using `"watch"` mode.  |

#### Types

- **`T_GeoOptions`**: Options for configuring the geolocation request.

  ```typescript
  export type T_GeoOptions = {
    enableHighAccuracy?: boolean;  // If true, the device will attempt to use the most accurate location method.
    timeout?: number;              // Maximum time in milliseconds that is allowed to wait for the geolocation response.
    maximumAge?: number;           // Maximum age in milliseconds of a possible cached position that is acceptable to return.
  };
  ```

- **`T_GeoPositionCoords`**: Coordinates provided by the geolocation API.

  ```typescript
  export type T_GeoPositionCoords = {
    accuracy: number;            // The accuracy of the position in meters.
    altitude: number | null;     // The altitude of the position in meters, or null if not available.
    altitudeAccuracy: number | null; // The accuracy of the altitude in meters, or null if not available.
    heading: number | null;      // The direction the device is moving, in degrees, or null if not available.
    latitude: number;            // The latitude of the position in degrees.
    longitude: number;           // The longitude of the position in degrees.
    speed: number | null;        // The speed at which the device is moving in meters per second, or null if not available.
  };
  ```

- **`T_GeoPosition`**: Contains the coordinates and timestamp.

  ```typescript
  export type T_GeoPosition = {
    coords: T_GeoPositionCoords; // The coordinates of the position.
    timestamp: number;          // The time at which the position was recorded.
  };
  ```

- **`T_GeoErrors`**: Errors that might occur during geolocation.

  ```typescript
  export type T_GeoErrors = {
    code?: number;   // The error code, if available.
    message: string; // A description of the error.
  };
  ```

- **`T_GeoType`**: Specifies the type of geolocation request.

  ```typescript
  export type T_GeoType = 'watch' | 'current';  // 'watch' for continuous updates, 'current' for a single location.
  ```

### Example Usage for `useGeo`

```jsx
import React, { useEffect, useState } from 'react';
import { useGeo } from 'react-device-permission';

const App = () => {
  const { coords, timestamp, errors } = useGeo('watch', { enableHighAccuracy: true, timeout: 5000 }, 1000);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (coords.latitude !== 0 || coords.longitude !== 0) {
      setIsLoading(false);
    }
  }, [coords]);

  return (
    <div>
      <h1>Geolocation Parameters</h1>
      {isLoading ? (
        <p>Loading geolocation data...</p>
      ) : errors ? (
        <div style={{ color: 'red' }}>
          <p>Error: {errors.message}</p>
        </div>
      ) : (
        <div>
          <p><strong>Latitude:</strong> {coords.latitude}</p>
          <p><strong>Longitude:</strong> {coords.longitude}</p>
          <p><strong>Accuracy:</strong> {coords.accuracy} meters</p>
          <p><strong>Timestamp:</strong> {timestamp}</p>
        </div>
      )}
    </div>
  );
};

export default App;
```

## Other Projects 🛠️

Check out my other projects on GitHub:

- **[react-custom-otp](https://github.com/hadiraz/react-custom-otp)**: A powerful React component library for adding OTP (One-Time Password) functionality to your project. 

## Connect with Me 🌐

Feel free to connect with me on LinkedIn:

- **[LinkedIn Profile](https://www.linkedin.com/in/hadi-raziei/)**

## Contributing 🤝

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/hadiraz/react-device-permission/issues).

## License 📝

This project is licensed under the MIT License.

---

**Note:** More hooks will be added to this package in future updates. Stay tuned!
