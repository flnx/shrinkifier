import { Format } from '@/types/FileData';

type ConvertFileProps = {
  file: File;
  selectedFormat: Format;
};

export const convertFile = async ({ file, selectedFormat }: ConvertFileProps) => {
  if (!file) {
    throw new Error('Please select a file');
  }

  if (!selectedFormat) {
    throw new Error('Please select a format');
  }

  // const res = await fetch('/api/convert?' + selectedFormat, {
  //   method: 'POST',
  //   body: file,
  //   headers: {
  //     'content-type': file?.type || 'application/octet-stream',
  //   },
  // });

  return true;

  // return res.json();
};
