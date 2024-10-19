import React from 'react';

interface PrioritySelectProps {
  selected: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PrioritySelect: React.FC<PrioritySelectProps> = ({ selected, onChange }) => {
  return (
    <select value={selected} onChange={onChange} className="border border-gray-300 rounded-md p-2">
      <option value="None">None</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  );
};

export default PrioritySelect;
