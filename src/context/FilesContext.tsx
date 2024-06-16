'use client';

import { useToast } from '@/components/ui/use-toast';
import { FileData, Format, Status } from '@/types/FileData';
import { createContext, useCallback, useContext, useState } from 'react';

interface FilesProviderProps {
  children: React.ReactNode;
}

interface FilesContextType {
  files: FileData[];
  selectedFormat: Format | null;
  addNewFilesHandler: (files: File[]) => void;
  selectFormatHandler: (format: Format) => void;
  handleFileStatus: (fileName: string, status: Status) => void;
  removeFileHandler: (fileName: string) => void;
}

const FilesContext = createContext<FilesContextType | null>(null);

export const FilesProvider = ({ children }: FilesProviderProps) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<Format | null>(null);
  const { toast } = useToast();

  const addNewFilesHandler = (newFiles: File[]) => {
    if (files.length >= 20) {
      toast({
        title: 'Whoops, Too Many Images!',
        description: 'Please remove some images before uploading new ones.',
        variant: 'destructive',
      });

      return null;
    }

    const filesData = newFiles.map((f) => ({
      blob: f,
      fileData: {
        url: URL.createObjectURL(f),
        size: (f.size / 1024).toFixed(2),
        name: f.name + f.size + f.type,
        ogName: f.name,
        type: f.type.replace('image/', '').toUpperCase(),
        status: Status.PENDING,
      },
    }));

    setFiles((prevFiles: FileData[]) => {
      const removeRepeatables = filesData.filter((newFile) => {
        const isAlreadySelected = prevFiles.some(
          (oldFile) => oldFile.fileData.name === newFile.fileData.name
        );

        if (!isAlreadySelected) return true;
      });

      return [...removeRepeatables.reverse(), ...prevFiles].slice(0, 20);
    });
  };

  const selectFormatHandler = (format: Format) => {
    setSelectedFormat(format);
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
    selectedFormat,
    addNewFilesHandler,
    selectFormatHandler,
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
