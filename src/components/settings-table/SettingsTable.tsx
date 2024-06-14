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

type SettingsTableProps = {
  imagesData: {
    url: string;
    size: string;
    name: string;
    type: string;
  }[];
  convertTo?: string;
};

export function SettingsTable({ imagesData, convertTo }: SettingsTableProps) {
  return (
    <Table>
      <TableCaption>Selected images</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {imagesData.map((image, i) => (
          <TableRow key={image.url + i}>
            <TableCell className="font-medium">
              <img
                src={image.url}
                alt="test"
                className="h-[50px] w-[50x] object-cover rounded-sm"
                width={50}
                height={50}
              />
            </TableCell>
            <TableCell>
              <div className="relative">
                <span className="text-[11px] bg-primary text-primary-foreground px-[3px] rounded-sm">
                  {image.type}
                </span>
                {convertTo && (
                  <>
                    <span className="font-extralight">{' > '}</span>
                    <span className="text-[11px] bg-primary text-primary-foreground px-[3px] rounded-sm">
                      {convertTo}
                    </span>
                  </>
                )}
                <span className="absolute -bottom-5 left-0 text-[11px] max-w-[160px] sm:max-w-sm truncate">{image.name}</span>
              </div>
            </TableCell>
            {/* <TableCell className="font-bold text-center">-50%</TableCell> */}
            <TableCell colSpan={3} className="text-right w-[90px]">
              <div>Download</div>
            </TableCell>
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
