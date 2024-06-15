import { convertFile } from '@/data-access/sendBlob';
import { FileData, Format, Status } from '@/types/FileData';

type ConvertSettingsProps = {
  files: FileData[];
  handleFileStatus: (fname: string, status: Status) => void;
};

export const useConvertSettings = ({
  files,
  handleFileStatus,
}: ConvertSettingsProps) => {
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

  return { handleFileConvertion, hasFilesToConvert, isConverting };
};
