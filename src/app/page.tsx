'use client';

import { DragAndDrop } from '@/components/drag-and-drop/DragAndDrop';
import { SettingsTable } from '@/components/settings-table/SettingsTable';
import { useMemo, useState } from 'react';

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const filesHandler = (files: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const imagesData = useMemo(() => {
    return files.map((f) => ({
      url: URL.createObjectURL(f),
      size: (f.size / 1024).toFixed(2),
      name: f.name,
      type: f.type.replace('image/', '').toUpperCase(),
    }));
  }, [files]);

  return (
    <div className="container max-w-screen-lg mt-10 space-y-10">
      <DragAndDrop handleFiles={filesHandler} />
      <SettingsTable imagesData={imagesData} convertTo={"WEBP"} />
    </div>
  );
}
