import { Format } from '@/types/FileData';

type ConvertFileProps = {
  file: File;
  convertTo: Format;
};

export const convertFile = async ({ file, convertTo }: ConvertFileProps) => {
  if (!file) {
    throw new Error('Please select a file');
  }

  if (!convertTo) {
    throw new Error('Please select a format');
  }

  // const res = await fetch('/api/convert?' + convertTo, {
  //   method: 'POST',
  //   body: file,
  //   headers: {
  //     'content-type': file?.type || 'application/octet-stream',
  //   },
  // });

  await new Promise((res) => setTimeout(res, Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000));
  return true;

  // return res.json();
};
