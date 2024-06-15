'use client';

import { ConvertSettings } from '@/components/convert-settings/ConvertSettings';
import { DragAndDrop } from '@/components/drag-and-drop/DragAndDrop';
import { SettingsTable } from '@/components/settings-table/SettingsTable';
import { type FileData, Status, Format } from '@/types/FileData';
import { useCallback, useState } from 'react';

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

    setFiles((prevFiles: FileData[]) =>
      [...prevFiles, ...filesData].slice(-20)
    );
  };

  const convertAllHandler = (format: Format) => {
    setConvertAllTo(format);
  };

  const handleFileStatus = (fileName: string, status: Status) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.fileData.name === fileName
          ? { ...f, fileData: { ...f.fileData, status } }
          : f
      )
    );
  };

  const removeFileHandler = useCallback((fileName: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter((f) => f.fileData.name !== fileName)
    );
  }, []);

  return (
    <div className="container max-w-screen-lg mt-10 space-y-6">
      <DragAndDrop handleFiles={filesHandler} />
      {files.length > 0 && (
        <>
          <ConvertSettings
            files={files}
            convertAllHandler={convertAllHandler}
            convertTo={convertAllTo}
            handleFileStatus={handleFileStatus}
          />
          <SettingsTable
            imagesData={files}
            convertTo={convertAllTo}
            removeFileHandler={removeFileHandler}
          />
        </>
      )}
    </div>
  );
}
