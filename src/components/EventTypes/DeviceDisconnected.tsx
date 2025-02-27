import { DeviceDisconnectedEvent_1_0_0 } from "@texturehq/events";
import { JsonBlock } from "../JsonBlock";
import { LedgerTable } from "../LedgerTable";
import { EventLedger } from "../../common/types";

const deviceDisconnectedEvent: DeviceDisconnectedEvent_1_0_0 = {
  type: "device.disconnected",
  version: "1.0.0",
  key: "cc0e387d55ab78fb204c5c2225eff0aa6a9ca3f32a8d5542f75fe9b8bd972d87",
  timestamp: "2024-08-22T15:54:52.013Z",
  data: {
    deviceId: "cllzcbw0t00016g7dfua590dd",
    workspaceId: "cllzcf9xe00066g7dcsxyq1e5",
    organizationId: "cm6y391is00000cjlea9361ht",
    updatedAt: "2024-08-22T15:54:52.013Z",
    createdAt: "2024-08-22T15:54:52.013Z",
    manufacturer: {
      slug: "tesla",
      displayName: "Tesla",
    },
    deviceModel: {
      slug: "tesla:powerwall",
      displayName: "Powerwall",
    },
    deviceType: "battery",
    tags: ["battery", "powerwall"],
    customer: {
      id: "cllzcbw0t00016g7dfua590dd",
      email: "bjones@texturehq.com",
      firstName: "Bob",
      lastName: "Jones",
      phone: "+15551234567",
    },
    site: {
      id: "cllzcbw0t00016g7dfua590dd",
      name: "Empire State Building",
      address: {
        streetAddress1: "20 W 34th St",
        city: "New York",
        state: "NY",
        postalCode: "10118",
        country: "US",
      },
      longitude: -73.985428,
      latitude: 40.748817,
    },
  },
};

const deviceDisconnectedEventLedger: EventLedger<DeviceDisconnectedEvent_1_0_0> = {
  deviceId: "The unique identifier for the device.",
  workspaceId: "The ID of the workspace associated with the device.",
  organizationId: "The ID of the organization associated with the device.",
  updatedAt: "The timestamp when this update was created. This is the timestamp of the request the OEM's API returned, not necessarly the timestamp of when the state was actually updated on the device. For that see state.createdAt.",
  createdAt: "The date and time when the device was created.",
  "manufacturer.slug":
    "The human-readable identifier of the manufacturer of the device.",
  "manufacturer.displayName":
    "The display name of the manufacturer of the device.",
  "deviceModel.slug": "The human-readable identifier of the device model.",
  "deviceModel.displayName": "The display name of the device model.",
  deviceType: "The type of device (e.g. battery).",
  tags: "An array of tags associated with the device.",
  "customer.id":
    "The unique identifier for the customer associated with the device.",
  "customer.referenceId":
    "The reference ID for the customer associated with the device.",
  "customer.email":
    "The email address of the customer associated with the device.",
  "customer.firstName":
    "The first name of the customer associated with the device.",
  "customer.lastName":
    "The last name of the customer associated with the device.",
  "customer.phone":
    "The phone number of the customer associated with the device.",
  "site.id": "The unique identifier for the site associated with the device.",
  "site.name": "The name of the site associated with the device.",
  "site.address.streetAddress1":
    "The first line of the street address of the site associated with the device.",
  "site.address.streetAddress2":
    "The second line of the street address of the site associated with the device.",
  "site.address.city": "The city of the site associated with the device.",
  "site.address.state": "The state of the site associated with the device.",
  "site.address.postalCode":
    "The postal code of the site associated with the device.",
  "site.address.country": "The country of the site associated with the device.",
  "site.longitude":
    "The longitude of the geographical coordinates of the site associated with the device.",
  "site.latitude":
    "The latitude of the geographical coordinates of the site associated with the device.",
};

export const DeviceDisconnectedEvent = () => (
  <>
    <JsonBlock data={deviceDisconnectedEvent} />
    <LedgerTable data={deviceDisconnectedEventLedger} />
  </>
);
