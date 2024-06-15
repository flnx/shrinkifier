import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { FileData } from '@/types/FileData';

type SettingsTableProps = {
  imagesData: FileData[];
  convertTo?: string;
};

export function SettingsTable({ imagesData, convertTo }: SettingsTableProps) {
  if (imagesData.length === 0) return null;

  return (
    <Table>
      <TableCaption>Selected images</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {imagesData.map(({ fileData }, i) => (
          <TableRow key={fileData.url + i}>
            <TableCell className="font-medium">
              <img
                src={fileData.url}
                alt="test"
                className="h-[50px] w-[50x] object-cover rounded-sm"
                width={50}
                height={50}
              />
            </TableCell>
            <TableCell>
              <div className="relative">
                <span className="text-[11px] bg-primary text-primary-foreground px-[3px] rounded-sm">
                  {fileData.type}
                </span>
                {convertTo && (
                  <>
                    <span className="font-extralight">{' > '}</span>
                    <span className="text-[11px] bg-primary text-primary-foreground px-[3px] rounded-sm">
                      {convertTo}
                    </span>
                  </>
                )}
                <span className="absolute -bottom-5 left-0 text-[11px] max-w-[160px] sm:max-w-sm truncate">
                  {fileData.name}
                </span>
              </div>
            </TableCell>
            {/* <TableCell className="font-bold text-center">-50%</TableCell> */}
            <TableCell colSpan={3} className="text-right w-[90px]">
              <Button size="sm">Download</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
