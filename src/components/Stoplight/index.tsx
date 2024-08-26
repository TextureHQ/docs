import React from "react";
import { API } from "@stoplight/elements";
import styles from "./index.module.scss";

interface StoplightProps {
  apiDescriptionUrl: string;
}

export function Stoplight({ apiDescriptionUrl }: StoplightProps) {
  console.log(apiDescriptionUrl)
  return (
      <div className={(styles as { stoplight: string }).stoplight}>
        <API apiDescriptionUrl={apiDescriptionUrl} layout="responsive" router="hash" />
      </div>
  );
}

export default Stoplight;
