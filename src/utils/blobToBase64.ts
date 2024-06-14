export const blobUrlToBase64 = async (blobUrl: string): Promise<string> => {
  const response = await fetch(blobUrl);

  if (!response.ok) {
    throw new Error(`Blob Error: ${blobUrl}: ${response.statusText}`);
  }

  const blob = await response.blob();

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = (reader.result as string)?.split(',')[1];
      if (base64String) {
        resolve(base64String);
      } else {
        reject(new Error('Failed to convert Blob to Base64 string'));
      }
    };

    reader.onerror = (error) => {
      reject(new Error(`Error reading Blob: ${error}`));
    };

    reader.readAsDataURL(blob);
  });
};
