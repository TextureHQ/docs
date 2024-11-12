import { EnrollmentApproved_0_0_1 } from "@texturehq/events";
import { JsonBlock } from "../JsonBlock";
import { LedgerTable } from "../LedgerTable";

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

const EnrollmentApprovedEventLedger: Record<
  keyof EnrollmentApproved_0_0_1["data"],
  string
> = {
  workspaceId: "The ID of the workspace associated with the enrollment.",
  organizationId: "The ID of the organization associated with the enrollment.",
  customer: "The customer associated with the enrollment.",
  program: "The program associated with the enrollment.",
};

export const EnrollmentApprovedEvent = () => (
  <>
    <JsonBlock data={enrollmentApprovedEvent} />
    <LedgerTable data={EnrollmentApprovedEventLedger} />
  </>
);
