import React from "react";

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

export default AddPhotoIcon;
