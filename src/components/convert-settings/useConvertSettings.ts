import { useFilesContext } from '@/context/FilesContext';
import { convertFile } from '@/data-access/convertFile';
import { zipFiles } from '@/lib/utils';
import { Status } from '@/types/FileData';
import { saveAs } from 'file-saver';
import { useToast } from '../ui/use-toast';

export const useConvertSettings = () => {
  const { toast } = useToast();

  const {
    files,
    handleFileStatus,
    addConvertedFileBlob,
    removeAllFilesHandler,
    handleFileFormat,
    selectedFormat
  } = useFilesContext();

  const submitFilesHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (files.length === 0) return;

    const promises = files
      .filter((f) => f.fileData.status !== Status.COMPLETED && f.convertedTo !== null)
      .map((f) => {
        handleFileStatus(f.fileData.name, Status.LOADING);

        const result = convertFile({
          file: f.blob,
          selectedFormat: f.convertedTo!,
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

  const zipAndDownload = async () => {
    try {
      const zippedFiles = await zipFiles(files);
      saveAs(zippedFiles, 'shrinkifier.zip');
    } catch (err) {
      toast({
        title: 'Failed to Zip Files',
        description: 'An error occurred while zipping the files. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const hasFilesToConvert = files.some((f) => f.fileData.status !== Status.COMPLETED);
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
    handleFileFormat,
    selectedFormat,
    hasFilesToClear: files.length !== 0,
  };
};
