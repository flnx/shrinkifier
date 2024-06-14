import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Completed',
    paymentMethod: 'JPG',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'In progress',
    paymentMethod: 'JPG',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'In progress',
    paymentMethod: 'PNG',
  },
];

export function SettingsTable() {
  return (
    <Table>
      <TableCaption>Selected images</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Format</TableHead>
          <TableHead>Format</TableHead>
          {/* <TableHead className="text-right">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">
              <img
                src="https://i.pravatar.cc/50"
                alt="test"
                className="h-[50px] w-[50x] object-cover rounded-sm"
                width={50}
                height={50}
              />
            </TableCell>
            <TableCell>
              <span className="text-[11px] bg-primary text-primary-foreground px-[3px] rounded-sm">
                JPG
              </span>
              <span className="font-extralight">{' > '}</span>
              <span className="text-[11px] bg-primary text-primary-foreground px-[3px] rounded-sm">
                PNG
              </span>
            </TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">Download</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
