import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import posthog from 'posthog-js';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface RootProps {
  children: React.ReactNode;
}

export default function Root({ children }: RootProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { POSTHOG_KEY, POSTHOG_HOST } = siteConfig.customFields as {
    POSTHOG_KEY?: string;
    POSTHOG_HOST?: string;
  };

  // Initialize PostHog on client-side only
  React.useEffect(() => {
    if (typeof window !== 'undefined' && POSTHOG_KEY && POSTHOG_HOST) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: true,
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') {
            // Log PostHog initialization in development
            console.log('PostHog initialized');
          }
        }
      });
    }
  }, [POSTHOG_KEY, POSTHOG_HOST]);

  return (
    <>
      {children}
      <Analytics />
    </>
  );
}