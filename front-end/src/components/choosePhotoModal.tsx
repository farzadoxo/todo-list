import React, { useState, useRef, useCallback } from 'react';
import { Modal } from 'react-responsive-modal';
import Webcam from 'react-webcam';
import 'react-responsive-modal/styles.css';
import api from '../axios';

interface PhotoIconWithModalProps {
  size?: number;
  color?: string;
  onImageSelected: (file: File) => void;
}

interface PhotoIcon {
  size?: number;
  color?: string;
  clickHandler: () => void;
}

const AddPhotoIcon: React.FC<PhotoIcon> = ({ size = 24, color = "currentColor", clickHandler }) => {
  return (
    <svg
      className="cursor-pointer"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={() => clickHandler()}
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
      <line x1="12" y1="10" x2="12" y2="16" />
      <line x1="9" y1="13" x2="15" y2="13" />
    </svg>
  );
};

const ChoosePhotoIcon: React.FC<PhotoIconWithModalProps> = ({ size, color, onImageSelected }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setIsCameraMode(false);
  };

  const uploadImage = async (file: File | string) => {
    const formData = new FormData();
    formData.append('image', file); // Adjust the key 'image' based on your backend requirements

    try {
      const response = await api.post('/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageSelected(file);
      uploadImage(file)
    }
  };

  const handleTakePhoto = () => {
    setIsCameraMode(true);
  };

  const toggleCamera = () => {
    setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setSelectedImage(imageSrc);
      setIsCameraMode(false);

      // Convert base64 to file
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "webcam-photo.jpg", { type: "image/jpeg" });
          onImageSelected(file);
          uploadImage(file)
        });
    }
  }, [webcamRef, onImageSelected]);

  const videoConstraints = {
    facingMode: facingMode
  };

  return (
    <>
      <AddPhotoIcon size={size} color={color} clickHandler={openModal} />
      <Modal open={isModalOpen} onClose={closeModal} center>
        <h2 className="text-2xl font-bold mb-4">Add Your Photo</h2>
        {!isCameraMode ? (
          <div className="flex mt-4 space-x-4">
            <button
              onClick={handleChooseImage}
              className="flex flex-col items-center justify-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              Choose Image
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={handleTakePhoto}
              className="flex flex-col items-center justify-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              Take Photo
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              videoConstraints={videoConstraints}
              className='rounded'
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={capture}
                className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition duration-300 ease-in-out"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" stroke="currentColor" stroke-width="2" d="M20 6h-4l-2-2H10L8 6H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button
                onClick={toggleCamera}
                className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition duration-300 ease-in-out"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" stroke="currentColor" stroke-width="2" d="M20 6h-4l-2-2H10L8 6H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
                  <path fill="none" stroke="currentColor" stroke-width="2" d="M14 15l2-2-2-2M10 15l-2-2 2-2" />
                  <path fill="none" stroke="currentColor" stroke-width="2" d="M16 13H8" />
                </svg>
              </button>
            </div>
          </div>
        )}
        {selectedImage && !isCameraMode && (
          <div className="mt-4">
            <img src={selectedImage} alt="Selected" className="max-w-full h-auto" />

            <button
              onClick={() => uploadImage(selectedImage)}
              className="bg-black text-white p-3 m-2 rounded-full hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              upload photo
            </button>
          </div>
        )}
      </Modal>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </>
  );
};

export default ChoosePhotoIcon;
