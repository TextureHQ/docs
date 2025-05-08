import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import manufacturersData from '@site/src/data/manufacturers.json';

interface StaticManufacturersListProps {
  className?: string;
}

// We're using the actual structure from the fetched data
interface Manufacturer {
  id: string;
  name: string;
  slug: string;
  supports_grid_services: boolean;
  support_level: string;
  supported_device_types?: string[];
  description?: string;
  description_html?: string;
  website_url?: string;
  documentation?: string;
  documentation_html?: string;
  source?: string;
  vector_icon?: {
    id: string;
    url: string;
    alt?: string;
  };
}

const PAYLOAD_CMS_URL = 'https://device.cms.texture.energy';

// Map device types to nice display names
const deviceTypeDisplayNames: Record<string, string> = {
  'battery': 'Batteries',
  'charger': 'EV Chargers',
  'inverter': 'Solar Inverters',
  'thermostat': 'Smart Thermostats',
  'vehicle': 'Electric Vehicles'
};

// Support level colors and descriptions
const supportLevelColors: Record<string, string> = {
  'production': '#90ee90', // light green
  'development': '#ffffe0', // light yellow
  'planned': '#ffdab9', // light orange
  'blocked': '#ffcccb', // light red
};

const supportLevelEmojis: Record<string, string> = {
  'production': '✅',
  'development': '🔨',
  'planned': '🗓️',
  'blocked': '🚫'
};

const StaticManufacturersList: React.FC<StaticManufacturersListProps> = ({ className }) => {
  const [textFilter, setTextFilter] = useState('');
  const [deviceTypeFilter, setDeviceTypeFilter] = useState<string | null>(null);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  
  // Get all unique device types from the data
  const allDeviceTypes = Array.from(
    new Set(
      manufacturersData.flatMap(m => m.supported_device_types || [])
    )
  ).sort();
  
  useEffect(() => {
    // Sort manufacturers by name
    const sortedManufacturers = [...manufacturersData].sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    
    // First filter by device type if selected
    let filteredManufacturers = sortedManufacturers;
    if (deviceTypeFilter) {
      filteredManufacturers = filteredManufacturers.filter(
        m => m.supported_device_types?.includes(deviceTypeFilter)
      );
    }
    
    // Then filter by text if entered
    if (textFilter) {
      const fuse = new Fuse(filteredManufacturers, {
        keys: ['name', 'supported_device_types'],
        threshold: 0.3,
      });
      const result = fuse.search(textFilter);
      setManufacturers(result.map(({ item }) => item));
    } else {
      setManufacturers(filteredManufacturers);
    }
  }, [textFilter, deviceTypeFilter]);

  const handleTextFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFilter(event.target.value);
  };
  
  const handleDeviceTypeFilterClick = (deviceType: string | null) => {
    setDeviceTypeFilter(deviceType);
  };

  return (
    <div className={className}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search manufacturers..."
          value={textFilter}
          onChange={handleTextFilterChange}
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
      
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <button
          onClick={() => handleDeviceTypeFilterClick(null)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: deviceTypeFilter === null ? '#0F71E0' : '#f5f5f5',
            color: deviceTypeFilter === null ? 'white' : 'black',
            cursor: 'pointer',
            fontWeight: 'medium',
          }}
        >
          All Manufacturers
        </button>
        
        {allDeviceTypes.map(deviceType => (
          <button
            key={deviceType}
            onClick={() => handleDeviceTypeFilterClick(deviceType)}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: deviceTypeFilter === deviceType ? '#0F71E0' : '#f5f5f5',
              color: deviceTypeFilter === deviceType ? 'white' : 'black',
              cursor: 'pointer',
              fontWeight: 'medium',
            }}
          >
            {deviceTypeDisplayNames[deviceType as keyof typeof deviceTypeDisplayNames] || deviceType}
          </button>
        ))}
      </div>

      {manufacturers.length === 0 ? (
        <p><em>No matching manufacturers found{textFilter ? ` for search "${textFilter}"` : ''}{deviceTypeFilter ? ` in category "${deviceTypeDisplayNames[deviceTypeFilter as keyof typeof deviceTypeDisplayNames] || deviceTypeFilter}"` : ''}</em></p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Manufacturer</th>
              <th>Support Level</th>
              <th>Grid Services</th>
              <th>Device Types</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map((manufacturer, index) => (
              <tr key={index}>
                <td style={{ display: 'flex', alignItems: 'center' }}>
                  {manufacturer.vector_icon?.url ? (
                    <img
                      src={`${PAYLOAD_CMS_URL}${encodeURI(manufacturer.vector_icon.url)}`}
                      alt={manufacturer.vector_icon.alt || `${manufacturer.name} logo`}
                      width={30}
                      height={30}
                      style={{ marginRight: '8px', display: 'none' }}
                      onLoad={(e) => e.currentTarget.style.display = 'inline-block'}
                    />
                  ) : null}
                  <a href={`/docs/sources/manufacturers/${manufacturer.slug}`}>
                    {manufacturer.name}
                  </a>
                </td>
                <td>
                  <span style={{
                    backgroundColor: supportLevelColors[manufacturer.support_level] || 'transparent',
                    color: 'black',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {supportLevelEmojis[manufacturer.support_level] || ''} {manufacturer.support_level}
                  </span>
                </td>
                <td>
                  {manufacturer.supported_device_types?.length === 1 && 
                   (manufacturer.supported_device_types[0] === 'vehicle' ||
                    manufacturer.supported_device_types[0] === 'charger' ||
                    manufacturer.supported_device_types[0] === 'thermostat')
                    ? 'N/A' 
                    : (manufacturer.supports_grid_services ? '✅' : '❌')}
                </td>
                <td>
                  {manufacturer.supported_device_types?.map(type => 
                    deviceTypeDisplayNames[type] || type
                  ).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaticManufacturersList;