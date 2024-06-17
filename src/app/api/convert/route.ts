import { Format } from '@/types/FileData';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

const FORMATS = ['PNG', 'JPEG', 'WEBP'];
const TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export async function POST(req: Request) {
  const selectedFormat = req.headers.get('u-format') || '';
  const headers = req.headers.get('content-type') || '';

  try {
    if (!FORMATS.includes(selectedFormat.toUpperCase()) || !TYPES.includes(headers)) {
      throw new Error('The requested format is not supported');
    }

    const blob = await req.blob();
    const arrayBuffer = await blob.arrayBuffer();

    let newBuffer: Buffer;

    switch (selectedFormat) {
      case Format.WEBP: {
        newBuffer = await sharp(arrayBuffer).webp({ quality: 70 }).toBuffer();
        break;
      }

      case Format.JPEG: {
        newBuffer = await sharp(arrayBuffer).jpeg({ quality: 70 }).toBuffer();
        break;
      }

      case Format.PNG: {
        newBuffer = await sharp(arrayBuffer)
          .png({ quality: 70, compressionLevel: 8 })
          .toBuffer();
        break;
      }

      default:
        throw new Error('The requested format is not supported');
    }

    const { width, height, size } = await sharp(newBuffer).metadata();

    if (size && width && height && size > 4 * 1024 * 1024) {
      newBuffer = await resizeToMaxSize(newBuffer);
    }

    return new Response(newBuffer, {
      status: 200,
      headers: {
        'Content-Type': `image/${selectedFormat.toLowerCase()}`,
      },
    });
  } catch (err: unknown) {
    const eMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: eMsg }, { status: 400 });
  }
}

async function resizeToMaxSize(buffer: Buffer): Promise<Buffer> {
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
