import JSONPretty from "react-json-pretty";

interface JsonBlockProps {
  data: any;
}

const theme = {
  main: "line-height:1.3;color:#393a34;background:#f6f8fa;overflow:auto;",
  error: "line-height:1.3;color:#393a34;background:#f6f8fa;overflow:auto;",
  key: "color:#37acaa;",
  string: "color:#e3116c;",
  value: "color:#a6e22e;",
  boolean: "color:#ac81fe;",
};

export const JsonBlock = (props: JsonBlockProps) => (
  <JSONPretty data={props.data} theme={theme} />
);
