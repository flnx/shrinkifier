import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Format, Status } from '@/types/FileData';
import { ProgressBar } from '@/components/progress-bar/ProgressBar';
import { Separator } from '@/components/ui/separator';

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

const ImageCardRow = ({
  fileData,
  selectedFormat,
  removeFileHandler,
}: SettingsTableProps) => {
  return (
    <>
      <div className="space-y-2 p-0 sm:px-2 flex flex-col sm:flex-row">
        <div className="flex items-center gap-8">
          {/* Image */}
          <section className="font-medium">
            <img
              src={fileData.url}
              alt="test"
              className="h-[80px] w-[80px] object-cover rounded-sm aspect-square"
              width={80}
              height={80}
            />
          </section>

          {/* Format */}
          <section className="flex-1 space-y-1">
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
            <div className="text-[11px] w-40 sm:w-[250px] md:w-auto max-w-screen-sm truncate">
              {fileData.ogName}
            </div>

            <div className="h-3 flex items-center">
              <ProgressBar status={fileData.status} />
            </div>
          </section>
        </div>

        {/* Buttons */}
        <section className="sm:ml-auto flex items-center gap-2 justify-between pt-3">
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
        </section>
      </div>
      <Separator className="my-4" />
    </>
  );
};

export const CardRowMemoized = memo(ImageCardRow);
