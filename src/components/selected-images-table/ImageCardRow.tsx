import React, { memo } from 'react';
import { cn, getSize } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FileData, Format, Status } from '@/types/FileData';
import { ProgressBar } from '@/components/progress-bar/ProgressBar';
import { Separator } from '@/components/ui/separator';
import { CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons';

type SettingsTableProps = {
  file: FileData;
  removeFileHandler: (fileName: string) => void;
};

const ImageCardRow = ({ file, removeFileHandler }: SettingsTableProps) => {
  const { fileData, convertedTo, convertedBlob, blob } = file;

  const handleDownload = () => {
    if (!convertedBlob) return;

    const blobUrl = URL.createObjectURL(convertedBlob);
    const link = document.createElement('a');

    link.download = fileData.ogName;
    link.href = blobUrl;

    document.body.appendChild(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(blobUrl);
  };

  const initialSize = getSize(Number(blob.size));
  const afterConvertionSize = getSize(convertedBlob?.size || 0);

  return (
    <>
      <div className="space-y-2 p-0 sm:px-2 flex flex-col sm:flex-row">
        <div className="flex items-center gap-8">
          {/* Image */}
          <section className="font-medium relative flex items-center justify-center">
            <img
              src={fileData.url}
              alt="test"
              className="h-[65px] w-[65px] object-cover rounded-sm aspect-square"
              width={65}
              height={65}
            />
            {fileData.status === Status.COMPLETED && (
              <>
                <div className="absolute w-full h-full bg-black/90 opacity-80 rounded-sm z-10 top-0" />
                <div className="absolute text-green-500 grid items-center font-mono text-[12px] z-10">
                  <CheckIcon width={40} height={40} className="ml-auto" />
                </div>
              </>
            )}
          </section>

          {/* Format */}
          <section className="flex-1 space-y-1">
            <span className="text-[10px] font-bold py-[2px] bg-foreground text-secondary px-[3px] rounded-sm">
              {fileData.type}
            </span>
            {convertedTo && (
              <>
                <ChevronRightIcon className="inline" height={14} width={14} />
                <span className="text-[10px] bg-primary font-bold dark:bg-primary text-white/90 py-[2px] px-[3px] rounded-sm">
                  {convertedTo.toUpperCase()}
                </span>
              </>
            )}
            <div className="text-[11px] w-40 sm:w-[250px] md:w-auto max-w-screen-sm truncate">
              {fileData.ogName.replace(/\.(png|webp|jpg|jpeg)$/i, '')}
            </div>

            <div className="flex gap-1 items-center">
              <p className="text-[11px] font-light">{initialSize}</p>
              {convertedBlob && (
                <>
                  <ChevronRightIcon width={12} height={12} />
                  <p className="text-[11px] font-light">
                    {afterConvertionSize}
                  </p>
                </>
              )}
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
            onClick={handleDownload}
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
            Clear
          </Button>
        </section>
      </div>
      <Separator className="my-4" />
    </>
  );
};

export const CardRowMemoized = memo(ImageCardRow);
