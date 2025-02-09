import { EnrollmentApproved_0_0_1 } from "@texturehq/events";
import { JsonBlock } from "../JsonBlock";
import { LedgerTable } from "../LedgerTable";
import { EventLedger } from "@site/src/common/types";

const enrollmentApprovedEvent: EnrollmentApproved_0_0_1 = {
  type: "enrollment.approved",
  version: "0.0.1",
  key: "8f7d3b2e1a9c6f4e0d5b8a7c2e1f3d5b8a7c2e1f3d5b8a7c2e1f3d5b8a7c2e1f",
  timestamp: "2024-03-20T14:30:00Z",
  data: {
    workspaceId: "clm2n3o4p5q6r7s8t9u0v1w2x",
    organizationId: "cla1b2c3d4e5f6g7h8i9j0k1l",
    customer: {
      id: "cm3excw3h000008jsdjqm42lc",
      workspaceId: "cm3exhlu0000008mb7j2gay6m",
      organizationId: "cm3exhssc000108mbcjbi5x8r",
      email: "jdoe@aol.com",
      firstName: "Jane",
      lastName: "Doe",
      referenceId: "cust-123456-abcdef",
      updatedAt: "2024-03-20T14:30:00Z",
      createdAt: "2024-03-20T14:30:00Z",
    },
    program: {
      manager: "GridCo Energy Services",
    },
  },
};

const EnrollmentApprovedEventLedger: EventLedger<EnrollmentApproved_0_0_1> = {
  workspaceId: "The ID of the workspace associated with the enrollment.",
  organizationId: "The ID of the organization associated with the enrollment.",
  "customer.id": "The ID of the customer associated with the enrollment.",
  "customer.workspaceId": "The ID of the workspace associated with the customer.",
  "customer.organizationId": "The ID of the organization associated with the customer.",
  "customer.email": "The email address of the customer.",
  "customer.phone": "The phone number of the customer.",
  "customer.firstName": "The first name of the customer.",
  "customer.lastName": "The last name of the customer.",
  "customer.referenceId": "The reference ID for the customer.",
  "customer.updatedAt": "The date and time when the customer was last updated.",
  "customer.createdAt": "The date and time when the customer was created.",
  "program.manager": "The manager of the program associated with the enrollment.",
};

export const EnrollmentApprovedEvent = () => (
  <>
    <JsonBlock data={enrollmentApprovedEvent} />
    <LedgerTable data={EnrollmentApprovedEventLedger} />
  </>
);
