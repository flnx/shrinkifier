'use client';

import { FileData, Format, Status } from '@/types/FileData';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface FilesProviderProps {
  children: React.ReactNode;
}

interface FilesContextType {
  files: FileData[];
  convertAllTo: Format | null;
  addNewFilesHandler: (files: File[]) => void;
  convertAllHandler: (format: Format) => void;
  handleFileStatus: (fileName: string, status: Status) => void;
  removeFileHandler: (fileName: string) => void;
}

const FilesContext = createContext<FilesContextType | null>(null);

export const FilesProvider = ({ children }: FilesProviderProps) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [convertAllTo, setConvertAllTo] = useState<Format | null>(null);

  const addNewFilesHandler = (files: File[]) => {
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

    // Latest 20 files
    setFiles((prevFiles: FileData[]) =>
      [...prevFiles, ...filesData].slice(-20)
    );
  };

  // Handler to set the format for all files
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

  const value = {
    files,
    convertAllTo,
    addNewFilesHandler,
    convertAllHandler,
    handleFileStatus,
    removeFileHandler,
  };

  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
};

export const useFilesContext = () => {
  const context = useContext(FilesContext);

  if (!context) {
    throw new Error('useFilesContext must be used within a FilesProvider');
  }

  return context;
};
