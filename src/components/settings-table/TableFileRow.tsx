import React, { memo } from 'react';
import { cn } from '@/lib/utils';

import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Format, Status } from '@/types/FileData';
import { ProgressBar } from '@/components/progress-bar/ProgressBar';

type SettingsTableProps = {
  fileData: {
    url: string;
    size: string;
    name: string;
    ogName: string;
    type: string;
    status: Status;
  };
  selectedFormat: Format | null;
  removeFileHandler: (fileName: string) => void;
};

const TableFileRow = ({
  fileData,
  selectedFormat,
  removeFileHandler,
}: SettingsTableProps) => {
  return (
    <TableRow>
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
        <div className="relative flex items-center gap-12">
          <div>
            <span className="text-[11px] bg-primary text-primary-foreground px-[3px] rounded-sm">
              {fileData.type}
            </span>
            {selectedFormat && (
              <>
                <span className="font-extralight">{' > '}</span>
                <span className="text-[11px] bg-primary text-primary-foreground px-[3px] rounded-sm">
                  {selectedFormat.toUpperCase()}
                </span>
              </>
            )}
            <span className="absolute -bottom-5 left-0 text-[11px] max-w-[160px] sm:max-w-sm truncate">
              {fileData.ogName}
            </span>
          </div>
          <ProgressBar status={fileData.status} />
        </div>
      </TableCell>
      {/* <TableCell className="font-bold text-center">-50%</TableCell> */}
      <TableCell colSpan={0} className="text-right w-[90px] ml-auto">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            disabled={fileData.status !== Status.COMPLETED}
            className={cn(
              fileData.status === Status.COMPLETED ? 'visible' : 'invisible'
            )}
          >
            Download
          </Button>
          <Button
            size="sm"
            disabled={fileData.status === Status.LOADING}
            variant="destructive"
            onClick={() => removeFileHandler(fileData.name)}
          >
            Remove
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export const TableFileRowMemoized = memo(TableFileRow);
