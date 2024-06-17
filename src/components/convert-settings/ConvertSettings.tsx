import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import { Format } from '@/types/FileData';
import { useConvertSettings } from './useConvertSettings';
import { useFilesContext } from '@/context/FilesContext';
import { cn } from '@/lib/utils';

export function ConvertSettings() {
  const { selectedFormat, selectFormatHandler } = useFilesContext();
  const {
    submitFilesHandler,
    isLoading,
    hasFilesToConvert,
    canZip,
    zipAndDownload,
  } = useConvertSettings();

  const isFormatSelected = !!selectedFormat;

  return (
    <div className="space-y-5">
      <form className="space-y-2" onSubmit={submitFilesHandler}>
        <p className="text-sm">Convert to</p>
        <div className="flex justify-between items-center gap-1">
          <div className="space-y-2">
            <Select name="format" onValueChange={selectFormatHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a format" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Formats</SelectLabel>
                  {Object.values(Format).map((format) => (
                    <SelectItem value={format} key={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={!isFormatSelected || !hasFilesToConvert || isLoading}
          >
            Convert All
          </Button>
        </div>
      </form>
      <Button
        type="button"
        className={cn(canZip && !isLoading ? 'visible' : 'invisible')}
        onClick={zipAndDownload}
      >
        Download All
      </Button>
    </div>
  );
}
