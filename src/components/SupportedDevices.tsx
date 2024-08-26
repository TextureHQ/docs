import React, { useState } from 'react';
import SupportedDevicesType from './SupportedDevicesType';

const SupportedDevices: React.FC = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search devices..."
          value={filter}
          onChange={handleFilterChange}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '100%',
            boxSizing: 'border-box',
            border: '2px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>
      <SupportedDevicesType type="battery" title="Batteries" filter={filter} />
      <SupportedDevicesType type="charger" title="EV Chargers" filter={filter} />
      <SupportedDevicesType type="inverter" title="Solar Inverters" filter={filter} />
      <SupportedDevicesType type="thermostat" title="Smart Thermostats" filter={filter} />
      <SupportedDevicesType type="vehicle" title="Electric Vehicles" filter={filter} />
    </>
  );
};

export default SupportedDevices;
