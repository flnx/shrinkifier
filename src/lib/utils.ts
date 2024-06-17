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