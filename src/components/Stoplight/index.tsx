import React from "react";
import { API } from "@stoplight/elements";
import "@stoplight/elements/styles.min.css";

interface StoplightProps {
  apiDescriptionUrl: string;
}

export function Stoplight({ apiDescriptionUrl }: StoplightProps) {
  return (
    <div>
      <API
        apiDescriptionUrl={apiDescriptionUrl}
        layout="responsive"
        router="hash"
      />
    </div>
  );
}

export default Stoplight;
