interface TableRowProps {
  value: string;
  description: string;
}

const TableRow = (props: TableRowProps) => (
  <tr>
    <td><code>{props.value}</code></td>
    <td>{props.description}</td>
  </tr>
);

interface LedgerTableProps {
  data: Record<string, string>;
}

export const LedgerTable = (props: LedgerTableProps) => (
  <table>
    <thead>
      <th>Key</th>
      <th>Description</th>
    </thead>
    {Object.keys(props.data).map((key: string) => (
      <TableRow value={key} description={props.data[key]} />
    ))}
  </table>
);
