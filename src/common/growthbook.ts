import { GrowthBook } from "@growthbook/growthbook";
import siteConfig from '@generated/docusaurus.config';


export const growthbook = new GrowthBook({
  apiHost: "https://cdn.growthbook.io",
  clientKey: siteConfig.customFields.GROWTHBOOK_CLIENT_KEY,
});
