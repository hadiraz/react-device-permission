export type T_Status = {
    permission: boolean,
    error: string,
    status: boolean
}
export type T_AllPermissions = {
    mic: boolean
}
export type T_StreamTypeProp = "audio" | "video" | "audio/video"

export type AudioMimeType =
    | 'audio/mpeg'
    | 'audio/ogg'
    | 'audio/wav'
    | 'audio/webm'
    | 'audio/aac'
    | 'audio/flac'
    | 'audio/x-m4a';

export type VideoMimeType =
    | 'video/mp4'
    | 'video/ogg'
    | 'video/webm'
    | 'video/x-msvideo'
    | 'video/x-flv'
    | 'video/quicktime'
    | 'video/x-matroska';

export type T_MimeType<T extends T_StreamTypeProp> =
    T extends "audio" ? AudioMimeType :
    T extends "video" | "audio/video" ? VideoMimeType :
    never;

export type AudioFileExtension =
    | '.mp3'
    | '.ogg'
    | '.wav'
    | '.webm'
    | '.m4a'
    | '.aac'
    | '.flac';

export type VideoFileExtension =
    | '.mp4'
    | '.ogg'
    | '.webm'
    | '.avi'
    | '.flv'
    | '.mov'
    | '.mkv';

export const mimeTypesToExtensions: { [key in AudioMimeType | VideoMimeType]: AudioFileExtension | VideoFileExtension } = {
    'audio/mpeg': '.mp3',
    'audio/ogg': '.ogg',
    'audio/wav': '.wav',
    'audio/webm': '.webm',
    'audio/aac': '.aac',
    'audio/flac': '.flac',
    'audio/x-m4a': '.m4a',
    'video/mp4': '.mp4',
    'video/ogg': '.ogg',
    'video/webm': '.webm',
    'video/x-msvideo': '.avi',
    'video/x-flv': '.flv',
    'video/quicktime': '.mov',
    'video/x-matroska': '.mkv'
};


export type T_StartRecord<T extends T_StreamTypeProp> = {
    setErrors: React.Dispatch<React.SetStateAction<Error | undefined>>,
    streamType: T,
    recordStreamRef: React.MutableRefObject<MediaStream | undefined>,
    setRecordStatus: React.Dispatch<React.SetStateAction<boolean>>,
    tempBlobRef: React.MutableRefObject<Blob[]>,
    recorderRef: React.MutableRefObject<MediaRecorder | undefined>,
    setRecordSrc: React.Dispatch<React.SetStateAction<string | undefined>>,
    recordStatus: boolean,
    mimType: T_MimeType<T>
}
export type T_StopRecord = {
    setErrors: React.Dispatch<React.SetStateAction<Error | undefined>>,
    recordStreamRef: React.MutableRefObject<MediaStream | undefined>,
    setRecordStatus: React.Dispatch<React.SetStateAction<boolean>>,
    tempBlobRef: React.MutableRefObject<Blob[]>,
    setRecordSrc: React.Dispatch<React.SetStateAction<string | undefined>>,
    recordStatus: boolean,
    recorderRef: React.MutableRefObject<MediaRecorder | undefined>,
}
export type T_PermissionRecord<T extends T_StreamTypeProp> = {
    setErrors: React.Dispatch<React.SetStateAction<Error | undefined>>,
    recordStreamRef: React.MutableRefObject<MediaStream | undefined>,
    streamType: T,

}
export type T_GeoOptions = {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
  };
  
  export type T_GeoPositionCoords = {
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number;
    longitude: number;
    speed: number | null;
  };
  
  export type T_GeoPositionTimestamp = number;
  export type T_GeoPosition = { coords: T_GeoPositionCoords; timestamp: T_GeoPositionTimestamp };
  
  export type T_GeoErrors = {
    code?: number;
    message: string;
  };
  
  export type T_GeoType = 'watch' | 'current';
