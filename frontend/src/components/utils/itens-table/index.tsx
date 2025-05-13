interface ITableProps {
  children: React.ReactNode;
}

export function Table({ children }: ITableProps) {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      {children}
    </table>
  );
}

export function TableHeader({ children }: ITableProps) {
  return (
    <thead>
      {children}
    </thead>
  );
}

interface ITableRowProps extends React.HTMLProps<HTMLTableRowElement> {
  children: React.ReactNode;
}

export function TableRow({ children, ...rest }: ITableRowProps) {
  return (
    <tr {...rest}  className="bg-gray-100">
      {children}
    </tr>
  )
}

interface ITableHeadProps extends React.HTMLProps<HTMLTableCellElement> {
  children: React.ReactNode;
}

export function TableHead({ children, ...rest }: ITableHeadProps) {
  return (
    <th {...rest} className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b">
      {children}
    </th>
  )
}

export function TableBody({ children }: ITableProps) {
  return (
    <tbody>
      {children}
    </tbody>
  )
}

export function TableCell({ children }: ITableProps) {
  return (
    <td className="px-4 py-2 text-sm text-gray-700 border-b">
      {children}
    </td>
  )
}
