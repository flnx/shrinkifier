import { useFilesContext } from '@/context/FilesContext';
import { useToast } from '@/components/ui/use-toast';
import { ChangeEvent, DragEvent, useCallback } from 'react';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB in bytes

export const useDragAndDropHandlers = () => {
  const { toast } = useToast();
  const { addNewFilesHandler } = useFilesContext();

  const handleOnSelectChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let isLimitExceeded = false;

    const files = Array.from(e.target.files || []).filter((file) => {
      if (file.type.startsWith('image/')) {
        if (file.size < MAX_FILE_SIZE) {
          return file;
        } else {
          isLimitExceeded = true;
        }
      }
    });

    if (isLimitExceeded) {
      toast({
        title: 'File Limit Exceeded',
        description: 'Some files were filtered out due to exceeding the limit',
        variant: 'destructive',
      });
    }

    addNewFilesHandler(files);
    e.target.value = '';
  }, [toast, addNewFilesHandler]);

  const handleDrop = useCallback((e: DragEvent) => {
    e?.preventDefault();
    let isLimitExceeded = false;

    const files = Array.from(e.dataTransfer.files).filter((file) => {
      if (file.type.startsWith('image/')) {
        if (file.size < MAX_FILE_SIZE) {
          return file;
        } else {
          isLimitExceeded = true;
        }
      }
    });

    if (isLimitExceeded) {
      toast({
        title: 'File Limit Exceeded',
        description: 'Some files were filtered out due to exceeding the limit',
        variant: 'destructive',
      });
    }

    addNewFilesHandler(files);
  }, [toast, addNewFilesHandler]);

  return { handleOnSelectChange, handleDrop };
};
