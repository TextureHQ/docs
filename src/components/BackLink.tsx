import React from "react";

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <div className="back-link-container">
      <a href={to} className="back-link">
        <svg
          className="back-arrow"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M15 8H3M3 8L8 3M3 8L8 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to {label}
      </a>
      <style>{`
        .back-link-container {
          margin-bottom: 2rem;
          margin-top: 1rem;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--ifm-color-primary);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .back-link:hover {
          color: var(--ifm-color-primary-dark);
          text-decoration: underline;
        }
        .back-arrow {
          transition: transform 0.2s ease;
        }
        .back-link:hover .back-arrow {
          transform: translateX(-2px);
        }
      `}</style>
    </div>
  );
}
