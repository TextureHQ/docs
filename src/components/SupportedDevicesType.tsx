import React, { useEffect, useState } from 'react';
import qs from 'qs';
import Fuse from 'fuse.js';

interface SupportedDevicesTypeProps {
  type: string;
  title: string;
  filter: string;
}

interface Manufacturer {
  name: string;
  vector_icon: VectorIcon;
  supports_grid_services: boolean;
  support_level: string;
}

interface VectorIcon {
  id: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes: {
    thumbnail: {
      url: string | null;
    };
    card: {
      url: string | null;
    };
    tablet: {
      url: string | null;
    };
  };
  createdAt: string;
  updatedAt: string;
  url: string;
}

interface DeviceModel {
  name: string;
  type: string;
  manufacturer: Manufacturer;
}

interface ApiResponse {
  docs: DeviceModel[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
}

const imageBaseUrl = 'https://device.cms.texture.energy'

const SupportedDevicesType: React.FC<SupportedDevicesTypeProps> = ({ type, title, filter }) => {
  const [allDeviceModels, setAllDeviceModels] = useState<DeviceModel[]>([]);
  const [deviceModels, setDeviceModels] = useState<DeviceModel[]>([]);
  let additionalNotes = null;

  switch(type) {
    case 'battery':
      additionalNotes = (
        <p>
          <em>
            <strong>Note:</strong> Grid Services is an advanced feature Texture 
            supports for specific manufacturers that enables richer integration 
            with the grid. Crucial for VPPs, REPs, Demand Response, and anyone 
            else that needs advanced control over their devices and their 
            interactions with the grid. Enables features like dispatching to 
            the grid on a moment's notice, overriding the battery's time of use 
            settings, and more.
          </em>
        </p>
      );
      break;
    case 'charger':
      additionalNotes = (
        <p>
          <em>
            <strong>Note:</strong> Support here for Chargers is rather light
            because we have had few requests from customers for this device
            category. If you are interested, let us know and we'll add support
            for it.
          </em>
        </p>
      );
      break;
    case 'thermostat':
      additionalNotes = (
        <p>
          <em>
            <strong>Note:</strong> Blocked means Texture has built and tested 
            an integration, but it is currently blocked by the manufacturer.
          </em>
        </p>
      );
      break;
    case 'vehicle':
      additionalNotes = (
        <p>
          <em>
            <strong>Note:</strong> Texture supports electric vehicles including 
            full battery electric vehicles (BEVs) and partial hybrid electric 
            vehicles (PHEVs). We do not support internal combustion engine (ICE) 
            vehicles because we are an electric energy platform. In order to be 
            supported on the Texture platform, the vehicle must be cloud-connected 
            and must provide access to the battery level and charge status. Some 
            of the supported vehicles here support battery level but have models 
            that are not cloud connected and unfortunately they cannot be connected 
            to the Texture platform (because we have no way of getting meaningful 
            data from them).
          </em>
        </p>
      );
      break;
  }

  useEffect(() => {
    const fetchDevices = async () => {
      const stringifiedQuery = qs.stringify({
        where: { type: { equals: type } },
        limit: 1000
      }, { addQueryPrefix: true})
      const response = await fetch(`https://device.cms.texture.energy/api/device_models${stringifiedQuery}`);
      const data: ApiResponse = await response.json();
      const allDeviceModels = data.docs;
      setAllDeviceModels(allDeviceModels);
    };
    fetchDevices();
  }, []);

  useEffect(() => {
    const filteredDeviceModels = allDeviceModels
      .filter((device) => device.type === type)
      .filter((device) => !device.name.startsWith('Unknown'))
      .sort((a, b) => {
        const manufacturerComparison = a.manufacturer.name.localeCompare(b.manufacturer.name);
               if (manufacturerComparison !== 0) {
          return manufacturerComparison;
        }
        return a.name.localeCompare(b.name);
      });

    if (filter) {
      const fuse = new Fuse(filteredDeviceModels, {
        keys: ['name', 'manufacturer.name'],
        threshold: 0.3,
      });
      const result = fuse.search(filter);
      setDeviceModels(result.map(({ item }) => item));
    } else {
      setDeviceModels(filteredDeviceModels);
    }
  }, [type, filter, allDeviceModels]);

  return (
    <div>
      <h2>Supported {title}</h2>
      {deviceModels.length === 0 ? (
        <p><em>No matching {title} for filter "{filter}"</em></p>
      ) : (
        <>
        <table>
          <thead>
            <tr>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Support Level</th>
              {(type === 'battery' || type === 'inverter') && <th>Grid Services Supported</th>}
            </tr>
          </thead>
          <tbody>
            {deviceModels.map((deviceModel, index) => (
              <tr key={index}>
                <td style={{ display: 'flex', alignItems: 'center' }}>
                  {deviceModel.manufacturer.vector_icon?.url ? (
                    <img
                      src={`${imageBaseUrl}${deviceModel.manufacturer.vector_icon.url}`}
                      alt="Manufacturer Icon"
                      width={30}
                      height={30}
                      style={{ marginRight: '8px', display: 'none' }}
                      onLoad={(e) => e.currentTarget.style.display = 'inline-block'}
                    />
                  ) : null} {deviceModel.manufacturer.name}
                </td>
                <td>{deviceModel.name}</td>
                <td>
                  <span style={{
                    backgroundColor: deviceModel.manufacturer.support_level === 'production' ? '#90ee90' : // light green
                                     deviceModel.manufacturer.support_level === 'blocked' ? '#ffcccb' : // light red
                                     deviceModel.manufacturer.support_level === 'development' ? '#ffffe0' : // light yellow
                                     deviceModel.manufacturer.support_level === 'planned' ? '#ffdab9' : 'transparent', // light orange
                    color: deviceModel.manufacturer.support_level === 'development' ? 'black' : 'black',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {deviceModel.manufacturer.support_level}
                  </span>
                </td>
                {(type === 'battery' || type === 'inverter') && <td>{deviceModel.manufacturer.supports_grid_services ? '✅' : '❌'}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        {additionalNotes}
        </>
      )}
    </div>
  );
};

export default SupportedDevicesType;
