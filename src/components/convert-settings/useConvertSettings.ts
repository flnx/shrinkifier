import { useFilesContext } from '@/context/FilesContext';
import { convertFile } from '@/data-access/convertFile';
import { zipFiles } from '@/lib/utils';
import { Format, Status } from '@/types/FileData';
import { saveAs } from 'file-saver';
import { useToast } from '../ui/use-toast';

export const useConvertSettings = () => {
  const { files, handleFileStatus, addConvertedFileBlob, removeAllFilesHandler } = useFilesContext();
  const { toast } = useToast();

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
          file: f.blob,
          selectedFormat: format,
        })
          .then((blob) => {
            addConvertedFileBlob(f.fileData.name, blob);
            handleFileStatus(f.fileData.name, Status.COMPLETED);
            return blob;
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

  const zipAndDownload = async () => {
    try {
      const zippedFiles = await zipFiles(files);
      saveAs(zippedFiles, 'shrinkify.zip');
    } catch (err) {
      toast({
        title: 'Failed to Zip Files',
        description: 'An error occurred while zipping the files. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const canZip = files.some((f) => f.convertedBlob);
  const isLoading = files.some((f) => f.fileData.status === Status.LOADING);

  return {
    submitFilesHandler,
    hasFilesToConvert,
    isLoading,
    files,
    canZip,
    zipAndDownload,
    removeAllFilesHandler,
    hasFilesToClear: files.length !== 0
  };
};
