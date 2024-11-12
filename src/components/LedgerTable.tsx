interface TableRowProps {
  value: string;
  description: string;
}

const TableRow = (props: TableRowProps) => (
  <tr>
    <td>
      <code>{props.value}</code>
    </td>
    <td>{props.description}</td>
  </tr>
);

interface LedgerTableProps {
  data: Record<string, string>;
}

export const LedgerTable = (props: LedgerTableProps) => (
  <table role="table">
    <tr role="row">
      <th role="columnheader" scope="col">
        Key
      </th>
      <th role="columnheader" scope="col">
        Description
      </th>
    </tr>
    {Object.keys(props.data).map((key: string) => (
      <TableRow key={key} value={key} description={props.data[key]} />
    ))}
  </table>
);
