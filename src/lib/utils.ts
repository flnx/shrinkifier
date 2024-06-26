import JSZip from 'jszip';
import sharp from 'sharp';

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

export async function resizeToMaxSize(buffer: Buffer): Promise<Buffer> {
  const metadata = await sharp(buffer).metadata();

  const { width, height, size } = metadata;

  if (size !== undefined && size > 4 * 1024 * 1024) {
    // Reduce dimensions by 10%
    const newWidth = Math.round((width || 0) * 0.9);
    const newHeight = Math.round((height || 0) * 0.9);

    const resizedBuffer = await sharp(buffer)
      .resize(newWidth, newHeight)
      .toBuffer();

    // Recursively call resizeToMaxSize with the resized buffer
    return await resizeToMaxSize(resizedBuffer);
  } else {
    // Return the buffer if it's within the size limit
    return buffer;
  }
}
