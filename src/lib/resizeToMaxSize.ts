import sharp from 'sharp';

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
