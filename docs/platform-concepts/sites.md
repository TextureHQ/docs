---
sidebar_position: 5
---

# Sites

_This page is a stub and will be updated soon. The Sites feature on Texture is in public beta and will be available for everyone soon. In the meantime if you are interested in helping us test the feature please let us know._

The Site is core to the Texture platform and it is in many ways the main model that everything else binds to.

We automatically create a Site when a customer connects a Device or Utility account.

When we create a Site, we take the following actions:
1. We take the raw details provided (generally an address) and geocode it to get the latitude and longitude of the Site.
1. We will upsert a record on the Texture platform for the Site.
1. If this is a new Site we will see whether there is an existing [Customer](./customers.md) for the Site and if not we will create it and link it to the Site
1. We will tag the site with the utility service territory and ISO based on its location
1. We will initiate jobs to collect marginal carbon emissions, weather data, and other Signals for that Site which we will use to Enrich that Site
1. We will automatically link that Site with any Device or Utility data that we have for that Site

And based on all of this, we make an Enriched Site available for use in our [Dashboard](https://dashboard.texturehq.com) and via our [API](/api/overview.md)