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
import { cn } from '@/lib/utils';

export function ConvertSettings() {
  const {
    submitFilesHandler,
    isLoading,
    hasFilesToConvert,
    canZip,
    zipAndDownload,
    removeAllFilesHandler,
    hasFilesToClear,
    selectedFormat,
    handleFileFormat
  } = useConvertSettings();

  const isFormatSelected = !!selectedFormat;

  return (
    <div className="space-y-5">
      <form className="space-y-2" onSubmit={submitFilesHandler}>
        <p className="text-sm">Convert to</p>
        <div className="flex justify-between items-center gap-1">
          <div className="space-y-2">
            <Select name="format" onValueChange={handleFileFormat}>
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
      <div className="flex justify-between gap-1">
        <Button
          type="button"
          className={cn(canZip && !isLoading ? 'visible' : 'invisible')}
          onClick={zipAndDownload}
          >
          Download All
        </Button>
        <Button
          type="button"
          variant="destructive"
          disabled={isLoading}
          className={cn(hasFilesToClear ? 'visible' : 'invisible')}
          onClick={removeAllFilesHandler}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}
