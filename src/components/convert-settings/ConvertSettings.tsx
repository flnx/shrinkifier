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
import { convertFile } from '@/data-access/sendBlob';
import { FileData, Format, Status } from '@/types/FileData';

type ConvertSettingsProps = {
  files: FileData[];
  convertTo: Format | null;
  convertAllHandler: (format: Format) => void;
  handleFileStatus: (fname: string, status: Status) => void;
};

export function ConvertSettings({
  files,
  convertAllHandler,
  convertTo,
  handleFileStatus,
}: ConvertSettingsProps) {
  const handleFileConvertion = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (files.length === 0) return;

    try {
      const formData = new FormData(e.currentTarget);
      const format = formData.get('format') as Format;

      const promises = files
        .filter((f) => f.fileData.status !== Status.COMPLETED)
        .map((f) => {
          handleFileStatus(f.fileData.name, Status.LOADING);

          const result = convertFile({
            file: files[0].blob,
            convertTo: format,
          })
            .then((res) => res)
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              handleFileStatus(f.fileData.name, Status.COMPLETED);
            });

          return result;
        });

      await Promise.all(promises);
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  const hasFilesToConvert = files.some(
    (f) => f.fileData.status !== Status.COMPLETED
  );
  const isConverting = files.some((f) => f.fileData.status === Status.LOADING);
  const isFormatSelected = !!convertTo;

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
