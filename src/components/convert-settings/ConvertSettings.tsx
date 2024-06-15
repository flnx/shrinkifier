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

export function ConvertSettings() {
  const { convertAllTo, convertAllHandler } = useFilesContext();
  const { handleFileConvertion, isConverting, hasFilesToConvert } = useConvertSettings();

  const isFormatSelected = !!convertAllTo;

  return (
    <form className="space-y-2" onSubmit={handleFileConvertion}>
      <p className="text-sm">Convert to</p>
      <div className="flex justify-between items-center gap-1">
        <div className="space-y-2">
          <Select name="format" onValueChange={convertAllHandler}>
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
          disabled={!isFormatSelected || !hasFilesToConvert || isConverting}
        >
          Convert All
        </Button>
      </div>
    </form>
  );
}
