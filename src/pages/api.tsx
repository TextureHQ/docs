import React, {Suspense, useEffect} from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// stoplight
import BrowserOnly from "@docusaurus/BrowserOnly";
import {Fallback} from "../components/Fallback";
import "./api.css"

const API_BASE_URL = process.env.API_BASE_URL || "https://api.texturehq.com"

const LazyStoplight = React.lazy(() => import("../components/Stoplight"));

function Stoplight(swaggerUrl: string) {
  return (
      <Layout title="API">
        <BrowserOnly>
          {() => (
              <Suspense fallback={Fallback}>
                <LazyStoplight apiDescriptionUrl={swaggerUrl}/>
              </Suspense>
          )}
        </BrowserOnly>
      </Layout>
  )
};

export default function Api() {
  const {siteConfig} = useDocusaurusContext();
  const url = `${API_BASE_URL}/v1/docs/swagger.json`;

  return (
    Stoplight(url)
  )
}
