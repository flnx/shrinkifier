'use client';

import { DroppableCard } from './DroppableCard';

type DragAndDropProps = {
  handleFiles: (files: File[]) => void;
};

export function DragAndDrop({ handleFiles }: DragAndDropProps) {
  const handleOnSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith('image/')
    );

    handleFiles(files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e?.preventDefault();

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/')
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
