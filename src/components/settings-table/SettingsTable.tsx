import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileData, Format } from '@/types/FileData';
import { TableFileRowMemoized } from './TableFileRow';

type SettingsTableProps = {
  imagesData: FileData[];
  convertTo: Format | null;
  removeFileHandler: (fileName: string) => void;
};

export function SettingsTable({
  imagesData,
  convertTo,
  removeFileHandler,
}: SettingsTableProps) {
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
          <TableFileRowMemoized
            key={fileData.url + fileData.size}
            removeFileHandler={removeFileHandler}
            convertTo={convertTo}
            fileData={fileData}
          />
        ))}
      </TableBody>
    </Table>
  );
}
