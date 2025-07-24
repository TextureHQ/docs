import React from "react";
import Link from "@docusaurus/Link";

interface WelcomeCardProps {
  title: string;
  description: string;
  linkText: string;
  linkTo: string;
  className?: string;
}

export function WelcomeCard({
  title,
  description,
  linkText,
  linkTo,
  className = "",
}: WelcomeCardProps) {
  return (
    <div className={`col col--4 col--md-6 col--sm-12 ${className}`}>
      <Link className="welcome-card-link" to={linkTo}>
        <div className="welcome-card">
          <div className="welcome-card__header">
            <h3>{title}</h3>
          </div>
          <div className="welcome-card__body">
            <p>{description}</p>
          </div>
          <div className="welcome-card__footer">
            <span className="welcome-card__link">{linkText}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
