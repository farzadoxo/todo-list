import React from 'react';

const PriorityIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, width = 24, height = 24, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 52 52"
      fill="currentColor"
      className={`fill-current ${className}`} // Allow Tailwind classes for color
      {...props}
    >
      <g>
        <path d="M9,3.5C9,2.7,8.3,2,7.5,2h-3C3.7,2,3,2.7,3,3.5v45C3,49.3,3.7,50,4.5,50h3C8.3,50,9,49.3,9,48.5V3.5z" />
        <path d="M47.5,7.7c-16,8.4-14.2-8.8-33.5-2.1c-0.6,0.2-1,0.8-1,1.4v23.3c0,0.7,0.7,1.2,1.3,0.9
                    c19.2-6.4,17.2,11.2,33.9,1.8c0.5-0.3,0.8-0.8,0.8-1.3V8.5C49,7.8,48.2,7.3,47.5,7.7z"/>
      </g>
    </svg>
  );
};

export default PriorityIcon;
