import React, { useState, useRef, useEffect } from "react";
import api from "@/axios";

const SelectImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fileInputRef.current?.click()
  }, [])

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className="flex flex-col items-center"> {/* Centering the content */}
      {selectedImage && (
        <div className="mt-4 flex flex-col items-center">
          {/* Larger image preview */}
          <img
            src={selectedImage}
            alt="Selected"
            className="w-96 h-96 object-cover border rounded-md shadow-lg"
          />

          <button
            onClick={() => uploadImage(selectedImage)}
            className="bg-black text-white p-3 m-2 rounded-full hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            Upload Photo
          </button>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default SelectImage;
