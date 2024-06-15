import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableFileRowMemoized } from './TableFileRow';
import { useFilesContext } from '@/context/FilesContext';

export function SettingsTable() {
  const { files, removeFileHandler, convertAllTo } = useFilesContext();

  return (
    <Table>
      <TableCaption>Selected images</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map(({ fileData }) => (
          <TableFileRowMemoized
            key={fileData.url + fileData.size}
            removeFileHandler={removeFileHandler}
            convertTo={convertAllTo}
            fileData={fileData}
          />
        ))}
      </TableBody>
    </Table>
  );
}
