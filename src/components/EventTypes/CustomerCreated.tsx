import { CustomerCreatedEvent_0_0_1 } from "@texturehq/events";
import { JsonBlock } from "../JsonBlock";
import { LedgerTable } from "../LedgerTable";
import { EventLedger } from "../../common/types";

const customerCreatedEvent: CustomerCreatedEvent_0_0_1 = {
  type: "customer.created",
  version: "0.0.1",
  key: "cc0e387d55ab78fb204c5c2225eff0aa6a9ca3f32a8d5542f75fe9b8bd972d87",
  timestamp: "2024-08-22T15:54:52.013Z",
  data: {
    id: "cllzcbw0t00016g7dfua590dd",
    workspaceId: "cllzcf9xe00066g7dcsxyq1e5",
    referenceId: "user-123456",
    organizationId: "cm6y0mhhy00000cl4hz6i78ik",
    updatedAt: "2024-08-22T15:54:52.013Z",
    createdAt: "2024-08-22T15:54:52.013Z",
    email: "bjones@texturehq.com",
    firstName: "Bob",
    lastName: "Jones",
    phone: "+15551234567",
  },
};

const customerCreatedEventLedger: EventLedger<CustomerCreatedEvent_0_0_1> = {
  id: "The unique identifier for the customer.",
  workspaceId: "The ID of the workspace associated with the customer.",
  referenceId: "The reference ID for the customer.",
  organizationId: "The ID of the organization associated with the customer.",
  updatedAt: "The date and time when the customer was last updated.",
  createdAt: "The date and time when the customer was created.",
  email: "The email address of the customer.",
  firstName: "The first name of the customer.",
  lastName: "The last name of the customer.",
  phone: "The phone number of the customer.",
};

export const CustomerCreatedEvent = () => (
  <>
    <JsonBlock data={customerCreatedEvent} />
    <LedgerTable data={customerCreatedEventLedger} />
  </>
);
