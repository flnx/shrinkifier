export const convertFile = async (file: File, convertTo: string) => {
  if (!file) {
    throw new Error('Please select a file');
  }

  if (!convertTo) {
    throw new Error('Please select a format');
  }

  const res = await fetch('/api/convert?' + convertTo, {
    method: 'POST',
    body: file,
    headers: {
      'content-type': file?.type || 'application/octet-stream',
    },
  });

  return res.json();
};
