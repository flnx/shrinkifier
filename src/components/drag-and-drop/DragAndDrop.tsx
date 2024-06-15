'use client';

import { useFilesContext } from '@/context/FilesContext';
import { DroppableCard } from './DroppableCard';
import { useToast } from '@/components/ui/use-toast';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB in bytes

export function DragAndDrop() {
  const { toast } = useToast();
  const { addNewFilesHandler } = useFilesContext();

  const handleOnSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        variant: "destructive"
      });
    }

    addNewFilesHandler(files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
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

    console.log(isLimitExceeded)

    if (isLimitExceeded) {
      toast({
        title: 'File Limit Exceeded',
        description: 'Some files were filtered out due to exceeding the limit',
        variant: "destructive"
      });
    }

    addNewFilesHandler(files);
  };

  return (
    <div>
      <DroppableCard
        handleOnSelectChange={handleOnSelectChange}
        handleDrop={handleDrop}
      />
    </div>
  );
}
