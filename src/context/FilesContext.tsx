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
  handleFileFormat: (format: Format) => void;
  handleFileStatus: (fileName: string, status: Status) => void;
  removeFileHandler: (fileName: string) => void;
  addConvertedFileBlob: (fileName: string, blob: Blob) => void;
  removeAllFilesHandler: () => void;
}

const FilesContext = createContext<FilesContextType | null>(null);

export const FilesProvider = ({ children }: FilesProviderProps) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<null | Format>(null);
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
      convertedTo: selectedFormat,
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

  const handleFileFormat = (format: Format) => {
    setSelectedFormat(format);
    setFiles((prevFiles) =>
      prevFiles.map((f) => ({
        ...f,
        convertedTo: f.convertedBlob ? f.convertedTo : format, // change format only if it has not been converted
      }))
    );
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

  const addConvertedFileBlob = (name: string, blob: Blob) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.fileData.name === name ? { ...f, convertedBlob: blob } : f
      )
    );
  };

  const removeFileHandler = useCallback((fileName: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter((f) => {
        if (f.fileData.name === fileName) {
          URL.revokeObjectURL(f.fileData.url);
          return false;
        }

        return true;
      })
    );
  }, []);

  const removeAllFilesHandler = () => {
    files.forEach((f) => {
      URL.revokeObjectURL(f.fileData.url);
    });

    setFiles([]);
  };

  const value = {
    files,
    addNewFilesHandler,
    handleFileFormat,
    handleFileStatus,
    removeFileHandler,
    addConvertedFileBlob,
    removeAllFilesHandler,
    selectedFormat
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
