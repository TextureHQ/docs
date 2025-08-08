import React, { useState, useEffect } from "react";
import appsData from "@site/src/data/apps.json";
import StatusTag from "./StatusTag";

interface StaticAppsListProps {
  className?: string;
}

// We're using the actual structure from the fetched data
interface App {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  support_level: string;
  logo?: any;
  is_included: boolean;
  is_featured_on_home_page: boolean;
  learn_more_url?: string;
  about?: string;
  configurationFields?: any[];
}

const PAYLOAD_CMS_URL = "https://device.cms.texture.energy";

// Map categories to nice display names
const categoryDisplayNames: Record<string, string> = {
  utilityData: "Utility Data",
  deviceData: "Device Data",
  marketAccess: "Market Access",
  crm: "CRM",
  permits: "Permits",
  rebatesAndIncentives: "Rebates and Incentives",
  energyModeling: "Energy Modeling",
  weather: "Weather",
  emissions: "Emissions",
  textureApps: "Texture Apps",
  gridServices: "Grid Services",
  siteIntelligence: "Site Intelligence",
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

// Category descriptions
const categoryDescriptions: Record<string, string> = {
  utilityData:
    "Connect to utility billing and meter data for comprehensive energy monitoring.",
  deviceData:
    "Connect to additional device types and manufacturers for comprehensive device management.",
  marketAccess:
    "Connect to energy markets and financial applications for revenue opportunities.",
  crm: "Integrate customer relationship management systems for unified workflows.",
  permits: "Track and manage permitting data for your Sites.",
  rebatesAndIncentives:
    "Track and capture available incentives for your energy projects.",
  energyModeling: "Get detailed energy insights and optimization strategies.",
  weather: "Integrate weather data for predictive energy management.",
  emissions: "Track and optimize for environmental impact.",
  textureApps: "Deploy branded experiences for your users.",
  gridServices: "Enable advanced grid interaction capabilities.",
  siteIntelligence: "Get comprehensive site intelligence and analytics.",
};

function getCategoryDescription(category: string): string {
  return categoryDescriptions[category] || "";
}

const StaticAppsList: React.FC<StaticAppsListProps> = ({ className }) => {
  const [apps, setApps] = useState<App[]>([]);

  // Get all unique categories from the data
  const allCategories = Array.from(
    new Set(appsData.map((app) => app.category))
  ).sort();

  useEffect(() => {
    // Sort apps by name
    const sortedApps = [...appsData].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setApps(sortedApps);
  }, []);

  return (
    <div className={`apps-list ${className || ""}`}>
      {apps.length === 0 ? (
        <div className="apps-empty">
          <p>No apps found.</p>
        </div>
      ) : (
        <div className="apps-categories">
          {allCategories.map((category) => {
            const categoryApps = apps.filter(
              (app) => app.category === category
            );

            if (categoryApps.length === 0) return null;

            return (
              <div key={category} className="category-section">
                <h3>{categoryDisplayNames[category] || category}</h3>
                <div className="category-description">
                  {getCategoryDescription(category)}
                </div>
                <div className="apps-table-container">
                  <table className="apps-table">
                    <thead>
                      <tr>
                        <th>App</th>
                        <th>Support Level</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryApps.map((app, index) => (
                        <tr key={index} className="app-row">
                          <td className="app-cell">
                            <div className="app-info">
                              {app.logo?.url ? (
                                <img
                                  src={`${PAYLOAD_CMS_URL}${app.logo.url
                                    .split("/")
                                    .map((segment) =>
                                      encodeURIComponent(segment)
                                    )
                                    .join("/")}`}
                                  alt={app.logo.alt || `${app.name} logo`}
                                  className="app-logo"
                                  onLoad={(e) =>
                                    (e.currentTarget.style.display =
                                      "inline-block")
                                  }
                                />
                              ) : null}
                              <a
                                href={app.learn_more_url || "#"}
                                className="app-link"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {app.name}
                              </a>
                            </div>
                          </td>
                          <td className="support-level-cell">
                            <StatusTag
                              type="support"
                              supportLevel={app.support_level}
                              variant="badge"
                            />
                          </td>
                          <td className="description-cell">
                            {app.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards for this category */}
                <div className="apps-cards">
                  {categoryApps.map((app, index) => (
                    <div key={index} className="app-card">
                      <div className="app-card-header">
                        {app.logo?.url ? (
                          <img
                            src={`${PAYLOAD_CMS_URL}${app.logo.url
                              .split("/")
                              .map((segment) => encodeURIComponent(segment))
                              .join("/")}`}
                            alt={app.logo.alt || `${app.name} logo`}
                            className="app-card-logo"
                            onLoad={(e) =>
                              (e.currentTarget.style.display = "inline-block")
                            }
                          />
                        ) : null}
                        <a
                          href={app.learn_more_url || "#"}
                          className="app-card-name"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {app.name}
                        </a>
                      </div>
                      <div className="app-card-details">
                        <div className="app-card-row">
                          <span className="app-card-label">Support:</span>
                          <span className="app-card-value">
                            <StatusTag
                              type="support"
                              supportLevel={app.support_level}
                              variant="badge"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="app-card-description">
                        {app.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .apps-list {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        }



        .apps-categories {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        @media (max-width: 768px) {
          .apps-categories {
            gap: 32px;
          }

          .category-header {
            font-size: 24px;
            margin-bottom: 12px;
          }

          .category-description {
            font-size: 14px;
            margin-bottom: 20px;
          }
        }

        .category-section {
          margin-bottom: 0;
        }



        .category-description {
          font-size: 16px;
          color: #6b7280;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .apps-table-container {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
            0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }

        .apps-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
          table-layout: fixed;
          border: none;
        }

        .apps-table th {
          background-color: #f9fafb;
          padding: 16px 20px;
          text-align: left;
          font-weight: 600;
          color: #1f2937;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
          text-transform: none;
          letter-spacing: normal;
        }

        .apps-table tbody:last-child tr:last-child td {
          border-bottom: none !important;
        }

        .apps-table th:nth-child(1) { width: 25%; }
        .apps-table th:nth-child(2) { width: 20%; }
        .apps-table th:nth-child(3) { width: 55%; }

        /* Mobile responsive - switch to card layout */
        @media (max-width: 768px) {
          .apps-table-container {
            display: none !important;
          }

          .apps-cards {
            display: grid !important;
            grid-template-columns: 1fr;
            gap: 16px;
            margin-top: 20px;
          }
        }

        /* Extra mobile breakpoint for testing */
        @media (max-width: 767px) {
          .apps-table-container {
            display: none !important;
          }

          .apps-cards {
            display: grid !important;
            grid-template-columns: 1fr;
            gap: 16px;
            margin-top: 20px;
          }
        }

          .app-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            margin-bottom: 16px;
          }

          .app-card-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
          }

          .app-card-logo {
            width: 48px;
            height: 48px;
            border-radius: 6px;
            object-fit: contain;
            border: 1px solid #e5e7eb;
            background-color: #ffffff;
          }

          .app-card-name {
            font-size: 16px;
            font-weight: 700;
            color: #1f2937;
            text-decoration: none;
            min-width: 0;
            word-wrap: break-word;
          }

          .app-card-name:hover {
            color: #3b82f6;
          }

          .app-card-details {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .app-card-row {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .app-card-label {
            font-size: 12px;
            font-weight: 600;
            color: #6b7280;
            min-width: 80px;
          }

          .app-card-value {
            font-size: 13px;
            color: #1f2937;
            line-height: 1.4;
          }

          .app-card-description {
            margin-top: 12px;
            font-size: 14px;
            color: #6b7280;
            line-height: 1.5;
          }
        }

        .app-row {
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s ease;
        }

        .app-row:hover {
          background-color: #f9fafb;
        }



        .app-cell,
        .category-cell,
        .support-level-cell,
        .description-cell {
          padding: 16px 20px;
          vertical-align: middle;
        }

        .app-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .app-logo {
          width: 48px;
          height: 48px;
          border-radius: 6px;
          object-fit: contain;
          display: none;
          border: 1px solid #e5e7eb;
          background-color: #ffffff;
        }

        .app-link {
          color: #1f2937;
          text-decoration: none;
          font-weight: 700;
          transition: color 0.2s ease;
        }

        .app-link:hover {
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

        .category-cell {
          color: #1f2937;
          font-size: 13px;
        }

        .description-cell {
          color: #1f2937;
          font-size: 13px;
          line-height: 1.4;
        }

        .apps-empty {
          text-align: center;
          padding: 48px 20px;
          color: #6b7280;
          font-style: italic;
        }

        /* Mobile cards - hidden by default */
        .apps-cards {
          display: none;
          margin-top: 20px;
        }

        /* Dark mode support */



        [data-theme="dark"] .category-description {
          color: #9ca3af;
        }

        [data-theme="dark"] .apps-table-container {
          background: #1f2937;
          border-color: #374151;
        }

        [data-theme="dark"] .apps-table th {
          background-color: #374151;
          color: #e5e7eb;
          border-bottom-color: #4b5563;
        }

        [data-theme="dark"] .app-row {
          border-bottom-color: #374151;
        }

        [data-theme="dark"] .app-row:hover {
          background-color: transparent;
        }

        [data-theme="dark"] .app-link {
          color: #e5e7eb;
        }

        [data-theme="dark"] .app-link:hover {
          color: #60a5fa;
        }

        [data-theme="dark"] .description-cell {
          color: #e5e7eb;
        }

        [data-theme="dark"] .app-logo {
          border-color: #4b5563;
          background-color: #374151;
        }

        [data-theme="dark"] .apps-empty {
          color: #9ca3af;
        }

        [data-theme="dark"] .app-card {
          background: #1f2937;
          border-color: #374151;
        }

        [data-theme="dark"] .app-card-logo {
          border-color: #4b5563;
          background-color: #374151;
        }

        [data-theme="dark"] .app-card-name {
          color: #e5e7eb;
        }

        [data-theme="dark"] .app-card-name:hover {
          color: #60a5fa;
        }

        [data-theme="dark"] .app-card-label {
          color: #9ca3af;
        }

        [data-theme="dark"] .app-card-value {
          color: #e5e7eb;
        }

        [data-theme="dark"] .app-card-description {
          color: #9ca3af;
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

export default StaticAppsList;
