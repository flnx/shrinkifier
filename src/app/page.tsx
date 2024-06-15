'use client';

import { ConvertSettings } from '@/components/convert-settings/ConvertSettings';
import { DragAndDrop } from '@/components/drag-and-drop/DragAndDrop';
import { SettingsTable } from '@/components/settings-table/SettingsTable';
import { type FileData, Status } from '@/types/FileData';
import { useState } from 'react';

export default function Home() {
  const [files, setFiles] = useState<FileData[]>([]);

  const filesHandler = (files: File[]) => {
    const filesData = files.map((f) => ({
      blob: f,
      fileData: {
        url: URL.createObjectURL(f),
        size: (f.size / 1024).toFixed(2),
        name: f.name,
        type: f.type.replace('image/', '').toUpperCase(),
        status: Status.PENDING,
      },
    }));

    setFiles((prevFiles: FileData[]) => [...prevFiles, ...filesData]);
  };

  return (
    <div className="container max-w-screen-lg mt-10 space-y-10">
      <DragAndDrop handleFiles={filesHandler} />
      <ConvertSettings />
      <SettingsTable imagesData={files} convertTo={'WEBP'} />
    </div>
  );
}
