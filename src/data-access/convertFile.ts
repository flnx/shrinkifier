import { Format } from '@/types/FileData';

type ConvertFileProps = {
  file: File;
  selectedFormat: Format;
};

export const convertFile = async ({
  file,
  selectedFormat,
}: ConvertFileProps) => {
  if (!file || !selectedFormat) {
    throw new Error('Please select a file and format');
  }

  const res = await fetch('/api/convert', {
    method: 'POST',
    body: file,
    headers: {
      'content-type': file?.type || 'application/octet-stream',
      'u-format': selectedFormat,
    },
  });

  const data = await res.json();
  const arrayBuffer = new Uint8Array(data.arrayBuffer.data).buffer;
  const mimeType = 'image/' + selectedFormat.toLocaleLowerCase();

  const blob = new Blob([arrayBuffer], { type: mimeType });

  return blob;
};
