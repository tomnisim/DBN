// src/components/ToggleBar.tsx
import React, { useState } from 'react';

const ToggleBar: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('No Filter');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  const handleFilterClick = () => {
    // Implement your filter logic here
    alert(`Filtering by: ${selectedFilter}`);
  };

  return (
    <div style={toggleBarStyle}>
      <div style={filterContainerStyle}>
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          style={selectStyle}
        >
          <option value="My Shifts">My Shifts</option>
          <option value="Available Shifts">Available Shifts</option>
          <option value="No Filter">No Filter</option>
        </select>
        <button style={filterButtonStyle} onClick={handleFilterClick}>
          Filter
        </button>
      </div>
    </div>
  );
};

const toggleBarStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  marginBottom: '1rem',
};

const filterContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const selectStyle: React.CSSProperties = {
  flex: '1',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginRight: '10px',
};

const filterButtonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '10px',
  cursor: 'pointer',
  borderRadius: '4px',
};

export default ToggleBar;
