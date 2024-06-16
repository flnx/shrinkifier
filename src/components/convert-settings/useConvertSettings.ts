import { useFilesContext } from '@/context/FilesContext';
import { convertFile } from '@/data-access/convertFile';
import { Format, Status } from '@/types/FileData';

export const useConvertSettings = () => {
  const { files, handleFileStatus } = useFilesContext();

  const submitFilesHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (files.length === 0) return;

    const formData = new FormData(e.currentTarget);
    const format = formData.get('format') as Format;

    const promises = files
      .filter((f) => f.fileData.status !== Status.COMPLETED)
      .map((f) => {
        handleFileStatus(f.fileData.name, Status.LOADING);

        const result = convertFile({
          file: files[0].blob,
          selectedFormat: format,
        })
          .then((res) => {
            handleFileStatus(f.fileData.name, Status.COMPLETED);
            return res;
          })
          .catch((err) => {
            handleFileStatus(f.fileData.name, Status.FAILED);
          });

        return result;
      });

    await Promise.allSettled(promises);
  };

  const hasFilesToConvert = files.some(
    (f) => f.fileData.status !== Status.COMPLETED
  );

  const isLoading = files.some((f) => f.fileData.status === Status.LOADING);

  return { submitFilesHandler, hasFilesToConvert, isLoading };
};
