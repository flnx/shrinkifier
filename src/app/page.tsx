'use client';

import { ConvertSettings } from '@/components/convert-settings/ConvertSettings';
import { DragAndDrop } from '@/components/drag-and-drop/DragAndDrop';
import { SettingsTable } from '@/components/settings-table/SettingsTable';
import { type FileData, Status, Format } from '@/types/FileData';
import { useState } from 'react';

export default function Home() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [convertAllTo, setConvertAllTo] = useState<Format | null>(null);

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

  const convertAllHandler = (format: Format) => {
    setConvertAllTo(format);
  };

  return (
    <div className="container max-w-screen-lg mt-10 space-y-6">
      <DragAndDrop handleFiles={filesHandler} />
      {files.length > 0 && (
        <>
          <ConvertSettings
            files={files}
            convertAllHandler={convertAllHandler}
            convertTo={convertAllTo}
          />
          <SettingsTable
            imagesData={files}
            convertTo={convertAllTo}
          />
        </>
      )}
    </div>
  );
}
