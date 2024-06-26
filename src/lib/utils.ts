import JSZip from 'jszip';

import { FileData } from '@/types/FileData';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function zipFiles(files: FileData[]) {
  const zip = new JSZip();
  const folder = zip.folder('converted_files');

  files.forEach((f, i) => {
    if (f.convertedBlob) {
      const ogName = f.fileData.ogName.replace(/\.(png|webp|jpg|jpeg)$/i, '');
      const mimeType = f.convertedBlob.type.replace('image/', `_shrinkified-${i}.`);
      const fileName = ogName + mimeType;
      folder?.file(fileName, f.convertedBlob);
    }
  });

  const zfiles = await zip.generateAsync({ type: 'blob' });
  return zfiles
}

export function getSize(sizeInBytes: number | null) {
  if (!sizeInBytes || isNaN(sizeInBytes)) return null;

  const sizeInKB = bytesToKB(sizeInBytes);

  if (sizeInKB > 1000) {
    const sizeInMB = bytesToMB(sizeInBytes);
    return `${sizeInMB.toFixed(2)} MB`;
  } else {
    return `${sizeInKB.toFixed(2)} KB`;
  }

  function bytesToKB(bytes: number): number {
    return bytes / 1024;
  }

  function bytesToMB(bytes: number): number {
    return bytes / (1024 * 1024);
  }
}