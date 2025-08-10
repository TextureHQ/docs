import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import manufacturersData from "@site/src/data/manufacturers.json";
import StatusTag from "./StatusTag";

interface StaticManufacturersListProps {
  className?: string;
}

// We're using the actual structure from the fetched data
interface Manufacturer {
  id: string;
  name: string;
  slug: string;
  support_level: string;
  supported_device_types?: string[];
  supports_grid_services?: boolean;
  description?: any;
  description_html?: string;
  about?: string;
  website_url?: string;
  documentation?: any;
  documentation_html?: string;
  source?: string;
  logo?: any;
  icon?: any;
  vector_icon?: any;
}

const PAYLOAD_CMS_URL = "https://device.cms.texture.energy";

// Map device types to nice display names
const deviceTypeDisplayNames: Record<string, string> = {
  battery: "Batteries",
  charger: "EV Chargers",
  inverter: "Solar Inverters",
  thermostat: "Smart Thermostats",
  vehicle: "Electric Vehicles",
};

// Support level colors and descriptions
const supportLevelColors: Record<string, string> = {
  production: "#065f46", // emerald-800
  development: "#92400e", // amber-800
  planned: "#5b21b6", // violet-800
  blocked: "#991b1b", // red-800
};

const supportLevelBgColors: Record<string, string> = {
  production: "#ecfdf5", // emerald-50
  development: "#fffbeb", // amber-50
  planned: "#f5f3ff", // violet-50
  blocked: "#fef2f2", // red-50
};

const supportLevelEmojis: Record<string, string> = {
  production: "",
  development: "",
  planned: "",
  blocked: "",
};

const StaticManufacturersList: React.FC<StaticManufacturersListProps> = ({
  className,
}) => {
  const [textFilter, setTextFilter] = useState("");
  const [deviceTypeFilter, setDeviceTypeFilter] = useState<string | null>(null);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  // Get all unique device types from the data
  const allDeviceTypes = Array.from(
    new Set(manufacturersData.flatMap((m) => m.supported_device_types || []))
  ).sort();

  useEffect(() => {
    // Sort manufacturers by name
    const sortedManufacturers = [...manufacturersData].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // First filter by device type if selected
    let filteredManufacturers = sortedManufacturers;
    if (deviceTypeFilter) {
      filteredManufacturers = filteredManufacturers.filter((m) =>
        m.supported_device_types?.includes(deviceTypeFilter)
      );
    }

    // Then filter by text if entered
    if (textFilter) {
      const fuse = new Fuse(filteredManufacturers, {
        keys: ["name", "supported_device_types"],
        threshold: 0.3,
      });
      const result = fuse.search(textFilter);
      setManufacturers(result.map(({ item }) => item));
    } else {
      setManufacturers(filteredManufacturers);
    }
  }, [textFilter, deviceTypeFilter]);

  const handleTextFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextFilter(event.target.value);
  };

  const handleDeviceTypeFilterClick = (deviceType: string | null) => {
    setDeviceTypeFilter(deviceType);
  };

  return (
    <div className={`manufacturers-list ${className || ""}`}>
      <div className="manufacturers-search">
        <input
          type="text"
          placeholder="Search manufacturers..."
          value={textFilter}
          onChange={handleTextFilterChange}
          className="manufacturers-search-input"
        />
      </div>

      <div className="manufacturers-filters">
        <button
          onClick={() => handleDeviceTypeFilterClick(null)}
          className={`filter-button ${
            deviceTypeFilter === null ? "active" : ""
          }`}
        >
          All Manufacturers
        </button>

        {allDeviceTypes.map((deviceType) => (
          <button
            key={deviceType}
            onClick={() => handleDeviceTypeFilterClick(deviceType)}
            className={`filter-button ${
              deviceTypeFilter === deviceType ? "active" : ""
            }`}
          >
            {deviceTypeDisplayNames[
              deviceType as keyof typeof deviceTypeDisplayNames
            ] || deviceType}
          </button>
        ))}
      </div>

      {manufacturers.length === 0 ? (
        <div className="manufacturers-empty">
          <p>
            No matching manufacturers found
            {textFilter ? ` for search "${textFilter}"` : ""}
            {deviceTypeFilter
              ? ` in category "${
                  deviceTypeDisplayNames[
                    deviceTypeFilter as keyof typeof deviceTypeDisplayNames
                  ] || deviceTypeFilter
                }"`
              : ""}
          </p>
        </div>
      ) : (
        <div className="manufacturers-table-container">
          <table className="manufacturers-table">
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
                <tr key={index} className="manufacturer-row">
                  <td className="manufacturer-cell">
                    <div className="manufacturer-info">
                      {manufacturer.vector_icon?.url ? (
                        <img
                          src={`${PAYLOAD_CMS_URL}${manufacturer.vector_icon.url
                            .split("/")
                            .map((segment) => encodeURIComponent(segment))
                            .join("/")}`}
                          alt={
                            manufacturer.vector_icon.alt ||
                            `${manufacturer.name} logo`
                          }
                          className="manufacturer-logo"
                          onLoad={(e) =>
                            (e.currentTarget.style.display = "inline-block")
                          }
                        />
                      ) : null}
                      <a
                        href={`/integrations/manufacturers/${manufacturer.slug}`}
                        className="manufacturer-link"
                      >
                        {manufacturer.name}
                      </a>
                    </div>
                  </td>
                  <td className="support-level-cell">
                    <StatusTag
                      type="support"
                      supportLevel={manufacturer.support_level}
                      variant="badge"
                    />
                  </td>
                  <td className="grid-services-cell">
                    <StatusTag
                      type="grid-services"
                      gridServices={manufacturer.supports_grid_services}
                      variant="badge"
                    />
                  </td>
                  <td className="device-types-cell">
                    {manufacturer.supported_device_types
                      ?.map((type) => deviceTypeDisplayNames[type] || type)
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile card layout */}
      <div className="manufacturers-cards">
        {manufacturers.map((manufacturer, index) => (
          <div key={index} className="manufacturer-card">
            <div className="manufacturer-card-header">
              {manufacturer.vector_icon?.url ? (
                <img
                  src={`${PAYLOAD_CMS_URL}${manufacturer.vector_icon.url
                    .split("/")
                    .map((segment) => encodeURIComponent(segment))
                    .join("/")}`}
                  alt={
                    manufacturer.vector_icon.alt || `${manufacturer.name} logo`
                  }
                  className="manufacturer-card-logo"
                  onLoad={(e) =>
                    (e.currentTarget.style.display = "inline-block")
                  }
                />
              ) : null}
              <a
                href={`/integrations/manufacturers/${manufacturer.slug}`}
                className="manufacturer-card-name"
              >
                {manufacturer.name}
              </a>
            </div>
            <div className="manufacturer-card-details">
              <div className="manufacturer-card-row">
                <span className="manufacturer-card-label">Support:</span>
                <span className="manufacturer-card-value">
                  <StatusTag
                    type="support"
                    supportLevel={manufacturer.support_level}
                    variant="badge"
                  />
                </span>
              </div>
              <div className="manufacturer-card-row">
                <span className="manufacturer-card-label">Grid Services:</span>
                <span className="manufacturer-card-value">
                  <StatusTag
                    type="grid-services"
                    gridServices={manufacturer.supports_grid_services}
                    variant="badge"
                  />
                </span>
              </div>
              <div className="manufacturer-card-row">
                <span className="manufacturer-card-label">Devices:</span>
                <span className="manufacturer-card-value">
                  {manufacturer.supported_device_types
                    ?.map((type) => deviceTypeDisplayNames[type] || type)
                    .join(", ")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .manufacturers-list {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        }

        .manufacturers-search {
          margin-bottom: 24px;
        }

        .manufacturers-search-input {
          width: 100%;
          padding: 12px 16px;
          font-size: 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background-color: #ffffff;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .manufacturers-search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .manufacturers-filters {
          display: flex;
          gap: 6px;
          margin-bottom: 32px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 4px 0;
        }

        .manufacturers-filters::-webkit-scrollbar {
          display: none;
        }

        .filter-button {
          padding: 6px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          background-color: #ffffff;
          color: #374151;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .filter-button:hover {
          background-color: #f9fafb;
          border-color: #d1d5db;
        }

        .filter-button.active {
          background-color: var(--brand-color);
          border-color: var(--brand-color);
          color: #ffffff;
        }

        .manufacturers-table-container {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
            0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }

        .manufacturers-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
          table-layout: fixed;
          border: none;
        }

        .manufacturers-table th {
          background-color: #f9fafb;
          padding: 16px 20px;
          text-align: left;
          font-weight: 600;
          color: #1f2937;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
          text-transform: none;
          letter-spacing: normal;
          width: 25%;
        }

        .manufacturers-table tbody:last-child tr:last-child td {
          border-bottom: none !important;
        }

        /* Mobile responsive - switch to card layout */
        @media (max-width: 768px) {
          .manufacturers-table-container {
            display: none !important;
          }

          .manufacturers-cards {
            display: grid !important;
            grid-template-columns: 1fr;
            gap: 16px;
            margin-top: 20px;
          }
        }

        /* Extra mobile breakpoint for testing */
        @media (max-width: 767px) {
          .manufacturers-table-container {
            display: none !important;
          }

          .manufacturers-cards {
            display: grid !important;
            grid-template-columns: 1fr;
            gap: 16px;
            margin-top: 20px;
          }
        }

          .manufacturer-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            margin-bottom: 16px;
          }

          .manufacturer-card-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
          }

          .manufacturer-card-logo {
            width: 40px;
            height: 40px;
            border-radius: 6px;
            object-fit: contain;
            border: 1px solid #e5e7eb;
            background-color: #ffffff;
          }

          .manufacturer-card-name {
            font-size: 16px;
            font-weight: 700;
            color: #1f2937;
            text-decoration: none;
            min-width: 0;
            word-wrap: break-word;
          }

          .manufacturer-card-name:hover {
            color: #3b82f6;
          }

          .manufacturer-card-details {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .manufacturer-card-row {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .manufacturer-card-label {
            font-size: 12px;
            font-weight: 600;
            color: #6b7280;
            min-width: 80px;
          }

          .manufacturer-card-value {
            font-size: 13px;
            color: #1f2937;
          }

          .manufacturers-filters {
            display: flex;
            overflow-x: auto;
            gap: 8px;
            padding: 4px 0;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .manufacturers-filters::-webkit-scrollbar {
            display: none;
          }

          .filter-button {
            padding: 8px 16px;
            font-size: 14px;
            white-space: nowrap;
            flex-shrink: 0;
            border-radius: 6px;
            min-width: fit-content;
          }

          .manufacturers-search-input {
            font-size: 16px;
            padding: 10px 14px;
          }
        }

        .manufacturer-row {
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s ease;
        }

        .manufacturer-row:hover {
          background-color: #f9fafb;
        }



        .manufacturer-cell,
        .support-level-cell,
        .grid-services-cell,
        .device-types-cell {
          padding: 16px 20px;
          vertical-align: middle;
          width: 25%;
        }

        .manufacturer-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .manufacturer-logo {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          object-fit: contain;
          display: none;
        }

        .manufacturer-link {
          color: #1f2937;
          text-decoration: none;
          font-weight: 700;
          transition: color 0.2s ease;
        }

        .manufacturer-link:hover {
          color: #3b82f6;
        }

        .support-level-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          text-transform: capitalize;
        }

        .grid-services-cell {
          color: #1f2937;
          font-size: 16px;
        }

        .device-types-cell {
          color: #1f2937;
          font-size: 13px;
        }

        .manufacturers-empty {
          text-align: center;
          padding: 48px 20px;
          color: #6b7280;
          font-style: italic;
        }

        /* Mobile cards - hidden by default */
        .manufacturers-cards {
          display: none;
          margin-top: 20px;
        }

        /* Dark mode support */
        [data-theme="dark"] .manufacturers-search-input {
          background-color: #374151;
          border-color: #4b5563;
          color: #e5e7eb;
        }

        [data-theme="dark"] .manufacturers-search-input:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
        }

        [data-theme="dark"] .filter-button {
          background-color: #1f2937;
          border-color: #374151;
          color: #d1d5db;
        }

        [data-theme="dark"] .filter-button:hover {
          background-color: #374151;
          border-color: #4b5563;
          color: #e5e7eb;
        }

        [data-theme="dark"] .filter-button.active {
          background-color: #3b82f6;
          border-color: #3b82f6;
          color: #ffffff;
        }

        [data-theme="dark"] .manufacturers-table-container {
          background: #1f2937;
          border-color: #374151;
        }

        [data-theme="dark"] .manufacturers-table th {
          background-color: #374151;
          color: #e5e7eb;
          border-bottom-color: #4b5563;
        }

        [data-theme="dark"] .manufacturer-row {
          border-bottom-color: #374151;
        }

        [data-theme="dark"] .manufacturer-row:hover {
          background-color: transparent;
        }

        [data-theme="dark"] .manufacturer-link {
          color: #e5e7eb;
        }

        [data-theme="dark"] .manufacturer-link:hover {
          color: #60a5fa;
        }

        [data-theme="dark"] .grid-services-cell,
        [data-theme="dark"] .device-types-cell {
          color: #e5e7eb;
        }

        [data-theme="dark"] .manufacturers-empty {
          color: #9ca3af;
        }

        [data-theme="dark"] .manufacturer-card {
          background: #1f2937;
          border-color: #374151;
        }

        [data-theme="dark"] .manufacturer-card-logo {
          border-color: #4b5563;
          background-color: #374151;
        }

        [data-theme="dark"] .manufacturer-card-name {
          color: #e5e7eb;
        }

        [data-theme="dark"] .manufacturer-card-name:hover {
          color: #60a5fa;
        }

        [data-theme="dark"] .manufacturer-card-label {
          color: #9ca3af;
        }

        [data-theme="dark"] .manufacturer-card-value {
          color: #e5e7eb;
        }

        /* Dark mode styles for status tags */
        [data-theme="dark"] .support-level-badge {
          background-color: var(--dark-bg-color) !important;
          color: var(--dark-text-color) !important;
        }
      `}</style>
    </div>
  );
};

export default StaticManufacturersList;
