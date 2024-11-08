import React from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

interface CustomDatePickerInputProps {
  value: string;
  onClick: () => void;
}

// Custom input component for the DatePicker
const CustomDatePickerInput: React.FC<CustomDatePickerInputProps> = ({ value, onClick }) => (
  <button
    className="flex items-center rounded-md p-1 hover:bg-gray-100 transition duration-300 ease-in-out"
    type="button"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={"30px"}
      height={"30px"}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="fill-current hover:fill-blue-500"
    >
      <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7" stroke="#000000" strokeWidth="1" strokeLinecap="round" />
      <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#000000" />
      <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#000000" />
      <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#000000" />
    </svg>
    <span className='text-sky-400 hover:text-blue-700 font-bold transition duration-300 ease-in-out hidden sm:block'>
      {value || "Select Date"}
    </span>
  </button>
);

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ selectedDate, onDateChange }) => {
  const todayDate = new Date();

  return (
    <DatePicker
      selected={selectedDate ? new Date(selectedDate) : todayDate}
      onChange={(date) => {
        if (date) {
          onDateChange(date);
        } else {
          onDateChange(todayDate); // Fallback to today’s date if date is null
        }
      }}
      customInput={<CustomDatePickerInput value={selectedDate ? format(new Date(selectedDate), "yyyy-MM-dd") : ""} onClick={() => { }} />}
      popperPlacement="left-start" // TODO: Adjust placement for mobile view based on screen size
    />
  );
};

export default CustomDatePicker;
