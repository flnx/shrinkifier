'use client';

import { DroppableCard } from './DroppableCard';

type DragAndDropProps = {
  handleFiles: (files: File[]) => void;
};

export function DragAndDrop({ handleFiles }: DragAndDropProps) {
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB in bytes

  const handleOnSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      (file) => file.type.startsWith('image/') && file.size < MAX_FILE_SIZE
    );

    handleFiles(files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e?.preventDefault();

    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type.startsWith('image/') && file.size < MAX_FILE_SIZE
    );

    handleFiles(files);
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
