import React from 'react';

interface FlashlightIconProps {
  isOn: boolean;
}

const FlashlightIcon: React.FC<FlashlightIconProps> = ({ isOn }) => {
  if (isOn) {

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flashlight-off"><path d="M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4" /><path d="M7 2h11v4c0 2-2 2-2 4v1" /><line x1="11" x2="18" y1="6" y2="6" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
    )
  } else {

    return (

      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flashlight"><path d="M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z" /><line x1="6" x2="18" y1="6" y2="6" /><line x1="12" x2="12" y1="12" y2="12" /></svg>
    )
  }
};


export default FlashlightIcon
