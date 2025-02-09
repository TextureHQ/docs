import { SiteCreatedEvent_0_0_1 } from "@texturehq/events";
import { JsonBlock } from "../JsonBlock";
import { LedgerTable } from "../LedgerTable";
import { EventLedger } from "../../common/types";

const siteCreatedEvent: SiteCreatedEvent_0_0_1 = {
  type: "site.created",
  version: "0.0.1",
  key: "cc0e387d55ab78fb204c5c2225eff0aa6a9ca3f32a8d5542f75fe9b8bd972d87",
  timestamp: "2024-08-22T15:54:52.013Z",
  data: {
    id: "cllzcbw0t00016g7dfua590dd",
    workspaceId: "cllzcf9xe00066g7dcsxyq1e5",
    referenceId: "user-123456",
    updatedAt: "2024-08-22T15:54:52.013Z",
    createdAt: "2024-08-22T15:54:52.013Z",
    siteName: "Empire State Building",
    location: {
        longitude: -73.985428,
        latitude: 40.748817,
    },
  },
};

const siteCreatedEventLedger: EventLedger<SiteCreatedEvent_0_0_1> = {
  id: "The unique identifier for the site.",
  workspaceId: "The ID of the workspace associated with the site.",
  referenceId: "The reference ID for the site.",
  siteName: "The name of the site.",
  updatedAt: "The date and time when the site was last updated.",
  createdAt: "The date and time when the site was created.",
  "location.latitude": "The latitiude of the geographical coordinates of the site.",
  "location.longitude": "The longitude of the geographical coordinates of the site.",
};

export const SiteCreatedEvent = () => (
  <>
    <JsonBlock data={siteCreatedEvent} />
    <LedgerTable data={siteCreatedEventLedger} />
  </>
);
