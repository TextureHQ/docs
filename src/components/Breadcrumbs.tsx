import React from "react";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="custom-breadcrumbs">
      <ol>
        {items.map((item, idx) => (
          <li key={item.href}>
            <a href={item.href} className="breadcrumb-link">
              {item.label}
            </a>
            {idx < items.length - 1 && (
              <span className="breadcrumb-separator">/</span>
            )}
          </li>
        ))}
      </ol>
      <style>{`
        .custom-breadcrumbs {
          margin-bottom: 2rem;
          font-size: 0.95rem;
          margin-top: 1rem;
        }
        .custom-breadcrumbs ol {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
        }
        .custom-breadcrumbs li {
          display: flex;
          align-items: center;
        }
        .breadcrumb-separator {
          margin: 0 0.5em;
          color: #888;
        }
        .breadcrumb-link {
          color: var(--ifm-color-primary);
          text-decoration: none;
        }
        .breadcrumb-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
}
