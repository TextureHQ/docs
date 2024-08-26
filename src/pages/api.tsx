import React, {Suspense, useEffect} from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {growthbook} from "@site/src/common/growthbook";
import {GrowthBookProvider, useFeatureIsOn, useFeatureValue} from "@growthbook/growthbook-react";
// stoplight
import BrowserOnly from "@docusaurus/BrowserOnly";
import {Fallback} from "../components/Fallback";
// swagger
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import "swagger-ui-themes/themes/3.x/theme-material.css"
import "./api.css"

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

function Swagger(swaggerUrl: string) {
  return (
      <Layout title="API">
        <div className="container">
          <h1>API Reference</h1>
          <p>
            Access the Texture API to connect your customers' energy devices to the Texture Platform, to monitor those
            devices, and to control them.
          </p>
          <p>
            Hop over to your <a href="https://dashboard.texturehq.com">Texture Dashboard</a> to get your API key. Then
            click the Authorize button below and paste your API key under `ApiKeyAuth` and then you can make requests to
            the Texture Platform using your API key.
          </p>
          <SwaggerUI
              url={swaggerUrl}
              persistAuthorization={true}
              deepLinking={true}/>
        </div>
      </Layout>
  )
}

export default function Api() {
  useEffect(() => {
    // Load features from the GrowthBook API and initialize the SDK
    growthbook.loadFeatures()
  }, []);

  const {siteConfig} = useDocusaurusContext();
  const url = `${siteConfig.customFields.API_BASE_URL}/v1/docs/swagger.json`;
  const stoplight = useFeatureValue("docs-stoplight", true);

  return (
      <GrowthBookProvider growthbook={growthbook}>
        {stoplight ? Stoplight(url) : Swagger(url)}
      </GrowthBookProvider>
  )
}
