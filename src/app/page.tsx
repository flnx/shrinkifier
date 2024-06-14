'use client';

import { DragAndDrop } from '@/components/drag-and-drop/DragAndDrop';
import { useMemo, useState } from 'react';

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const filesHandler = (files: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const imageUrls = useMemo(() => {
    return files.map((f) => URL.createObjectURL(f));
  }, [files]);

  return (
    <div className="container max-w-screen-lg mt-10">
      <DragAndDrop handleFiles={filesHandler} />
      <div className="flex gap-2 mt-5">
        {imageUrls.map((url, i) => (
          <img
            src={url}
            alt="hi there"
            className="w-[100px] h-100px rounded-xl"
            key={url + i}
          />
        ))}
      </div>
    </div>
  );
}
