import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TableFileRowMemoized } from './TableFileRow';
import { useFilesContext } from '@/context/FilesContext';

export function SettingsTable() {
  const { files, removeFileHandler, selectedFormat } = useFilesContext();

  return (
    <Table>
      <TableCaption className="caption-top">
        {files.length === 0
          ? 'Select or drop images to proceed'
          : 'Selected images: ' + files.length + '/20'}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map(({ fileData }) => (
          <TableFileRowMemoized
            key={fileData.name}
            removeFileHandler={removeFileHandler}
            selectedFormat={selectedFormat}
            fileData={fileData}
          />
        ))}
      </TableBody>
    </Table>
  );
}
