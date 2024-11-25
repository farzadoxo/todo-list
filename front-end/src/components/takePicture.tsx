import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import FlashlightIcon from "@/icons/torchIcon"
import api from "@/axios";

const CustomWebcam: React.FC = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [torchEnabled, setTorchEnabled] = useState<boolean>(false);

  const toggleCamera = () => {
    setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
  };

  const videoConstraints = {
    facingMode: facingMode,
    // Add additional constraints if needed
  };

  const uploadImage = async (file: File | string) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {

      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const retakePicture = () => {
    setImgSrc(null); // Clear the captured image
  };

  // Function to toggle the torch
  const toggleTorch = async () => {
    if (webcamRef.current) {
      const stream = webcamRef.current.stream;
      if (stream) {
        const track = stream.getVideoTracks()[0];
        if (track && typeof track.applyConstraints === "function") {
          try {
            await track.applyConstraints({
              //@ts-expect-error torch not found in supportedConstraints
              advanced: [{ torch: !torchEnabled }]
            });
            setTorchEnabled(!torchEnabled); // Toggle torch state
          } catch (error) {
            console.error("Error toggling torch:", error);
          }
        }
      }
    }
  };

  return (
    <div>
      {imgSrc ? (
        <div>
          <img src={imgSrc} alt="Captured" />
          <div className="mt-4 flex text-lg font-bold justify-around">
            <button
              onClick={() => uploadImage(imgSrc)}
              className="bg-black text-white p-3 rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
            >
              Upload
            </button>
            <button
              onClick={retakePicture}
              className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
            >
              Retake
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col max-w-xl mx-auto pt-7">
          <Webcam
            audio={false}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
            className="rounded-lg"
          />

          <div className="mt-4 flex justify-between">
            <button
              onClick={capture}
              className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              <svg width="35" height="35" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M20 6h-4l-2-2H10L8 6H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            <button
              onClick={toggleCamera}
              className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              <svg width="35" height="35" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M20 6h-4l-2-2H10L8 6H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M14 15l2-2-2-2M10 15l-2-2 2-2" />
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M16 13H8" />
              </svg>
            </button>

            <button
              onClick={toggleTorch}
              className={`p-3 rounded-full transition duration-300 ease-in-out ${torchEnabled ? 'bg-yellow-700' : 'bg-black text-white'}`}
            >
              {torchEnabled ?
                (
                  <FlashlightIcon isOn={true} />
                ) : (
                  <FlashlightIcon isOn={false} />
                )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomWebcam;
