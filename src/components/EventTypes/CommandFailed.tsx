import { CommandFailedEvent_0_0_2 } from "@texturehq/events";
import { JsonBlock } from "../JsonBlock";
import { LedgerTable } from "../LedgerTable";

const commandFailedEvent: CommandFailedEvent_0_0_2 = {
  type: "command.failed",
  version: "0.0.2",
  key: "cc0e387d55ab78fb204c5c2225eff0aa6a9ca3f32a8d5542f75fe9b8bd972d87",
  timestamp: "2024-08-22T15:54:52.013Z",
  data: {
    workspaceId: "cllzcf9xe00066g7dcsxyq1e5",
    commandId: "cllzcbw0t00016g7dfua590dd",
    deviceId: "cllzcbw0t00016g7dfua590dd",
    error: {
      message: "Failed to execute command",
    },
    issuedAt: "2023-09-01T20:48:24.967Z",
    executedAt: "2023-09-01T20:48:24.967Z",
  },
};

const CommandFailedEventLedger: Record<keyof CommandFailedEvent_0_0_2["data"], string> = {
  workspaceId: "The ID of the workspace associated with the command.",
  commandId: "The unique identifier for the command.",
  deviceId: "The ID of the device on which the command was executed.",
  error: "The error that occurred.",
  issuedAt: "The date and time when the command was issued.",
  executedAt: "The date and time when the command was executed.",
}

export const CommandFailedEvent = () => (
    <>
        <JsonBlock data={commandFailedEvent} />
        <LedgerTable data={CommandFailedEventLedger} />
    </>
);
