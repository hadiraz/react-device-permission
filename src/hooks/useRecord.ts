import { useCallback, useEffect, useRef, useState } from "react"
import { T_StreamTypeProp } from "../types/types";


const useRecord = (streamType: T_StreamTypeProp, fileName: string) => {
    const [errors, setErrors] = useState<Error>();
    const [recordSrc, setRecordSrc] = useState<string>();
    const [recordStatus, setRecordStatus] = useState(false)
    const recordStreamRef = useRef<MediaStream | undefined>(undefined);
    const recorderRef = useRef<MediaRecorder | undefined>(undefined);
    const tempBlobRef = useRef<Blob[]>([]);
    const [fileExtension, setFileExtension] = useState<"webm" | "ogg">("webm");

    useEffect(() => {
        const splitType = streamType.split("/");
        if (splitType.includes("video")) {
            setFileExtension("webm");
        } else setFileExtension("ogg");

    }, [fileName, streamType]);

    const streamTypeValues = {
        "audio": { audio: true },
        "video": { video: true },
        "audio/video": { audio: true, video: true },
    }

    const getPermission = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(streamTypeValues[streamType]);
            recordStreamRef.current = stream
        } catch (error) {
            setErrors(error as Error)
        }
    }, [])

    const startRecording = useCallback(async () => {
        if (!recordStatus) {
            setRecordStatus(true);
            await getPermission();
            tempBlobRef.current = []
            if (recordStreamRef.current) {
                recorderRef.current = new MediaRecorder(recordStreamRef.current);
                if (recorderRef.current) {
                    recorderRef.current.addEventListener("dataavailable", e => {
                        tempBlobRef.current.push(e.data)
                    })
                    recorderRef.current.start()
                }

            } else setErrors(new Error("You need to get permission from user first"))
        } else setErrors(new Error("Something is recording now, stop it and try again"))
    }, [recordStatus])

    const stopRecording = useCallback(async () => {
        if (recordStatus) {
            setErrors(undefined)
            setRecordSrc("")
            if (recorderRef.current && recordStreamRef.current) {
                recorderRef.current.addEventListener("stop", () => {
                    const finalBlob = new Blob(tempBlobRef.current);
                    setRecordSrc(URL.createObjectURL(finalBlob));

                })
                recorderRef.current.stop();
                recordStreamRef.current.getTracks().forEach(track => track.stop());
                setRecordStatus(false)
            } else setErrors(new Error("You need to get permission first"))
        } else setErrors(new Error("Nothing is recording now."))
    }, [recordStatus])



    return {
        startRecording,
        stopRecording,
        recordSrc,
        errors,
        fileNameWithExtension: `${fileName}.${fileExtension}`
    }
}
export default useRecord