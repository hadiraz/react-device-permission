[![npm version](https://img.shields.io/npm/v/react-device-permission.svg?style=flat-square)](https://www.npmjs.com/package/react-device-permission)
[![license](https://img.shields.io/npm/l/react-device-permission.svg?style=flat-square)](https://github.com/hadiraz/react-device-permission/blob/main/LICENSE)

# [React Device Permission]("https://github.com/hadiraz/react-device-permission") 📸🎤

### Get microphone and camera access in a sec

This React hooks library simplifies handling device permissions and recording audio/video streams

## Features ✨
- 🎥 Record video streams.
- 🎤 Record audio streams.
- 🛠️ Simple and easy-to-use API.

## Installation 📦

```bash
npm install react-device-permission
```

## Usage 🚀

### `useRecord` Hook

This hook manages recording from the user's camera and/or microphone.

#### Arguments

| Argument Name     | Type                         | Description                                                                 |
|-------------------|------------------------------|-----------------------------------------------------------------------------|
| `streamType`      | `T_StreamTypeProp`           | The type of stream to capture (`"audio"`, `"video"`, `"audio/video"`).      |
| `fileName`        | `string`                     | The name of the file to be saved (without extension).                       |

#### Returns

| Return Value              | Type                             | Description                                                                                      |
|---------------------------|----------------------------------|--------------------------------------------------------------------------------------------------|
| `startRecording`          | `() => Promise<void>`            | Function to start recording.                                                                     |
| `stopRecording`           | `() => Promise<void>`            | Function to stop recording.                                                                      |
| `recordSrc`               | `string \| undefined`            | The URL of the recorded media.                                                                   |
| `errors`                  | `Error \| undefined`             | Any errors that occur during recording.                                                          |
| `fileNameWithExtension`   | `string`                         | The complete filename with the correct extension (e.g., `"my-video.webm"` or `"my-audio.ogg"`).  |

### Example Usage

```jsx
import React , { useEffect } from 'react';
import { useRecord } from 'react-device-permission';

const App = () => {
  const { startRecording, stopRecording, recordSrc, fileNameWithExtension , errors } = useRecord('video', 'my-video');

  useEffect(()=>{
    console.log(errors)
  },[errors]);

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
