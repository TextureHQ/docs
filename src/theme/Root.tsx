import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { PostHogProvider } from 'posthog-js/react';
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

  // PostHog init options
  const posthogOptions = {
    api_host: POSTHOG_HOST,
  };

  return (
    <>
      {POSTHOG_KEY && POSTHOG_HOST ? (
        <PostHogProvider 
          apiKey={POSTHOG_KEY} 
          options={posthogOptions}
        >
          {children}
          <Analytics />
        </PostHogProvider>
      ) : (
        <>
          {children}
          <Analytics />
        </>
      )}
    </>
  );
}