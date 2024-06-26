import { resizeToMaxSize } from '@/lib/resizeToMaxSize';
import { Format } from '@/types/FileData';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

const FORMATS = ['PNG', 'JPEG', 'WEBP'];
const TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(req: Request) {
  const selectedFormat = req.headers.get('u-format') || '';
  const headers = req.headers.get('content-type') || '';

  try {
    if (
      !FORMATS.includes(selectedFormat.toUpperCase()) ||
      !TYPES.includes(headers)
    ) {
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
        newBuffer = await sharp(arrayBuffer)
          .jpeg({ quality: 70, mozjpeg: true })
          .toBuffer();
        break;
      }

      case Format.PNG: {
        newBuffer = await sharp(arrayBuffer)
          .png({ quality: 70, compressionLevel: 9 })
          .toBuffer();
        break;
      }

      default:
        throw new Error('The requested format is not supported');
    }

    const { width, height, size } = await sharp(newBuffer).metadata();

    // Handles rare cases where conversion (e.g. JPEG to PNG) increases file size.
    if (size && width && height && size > 4 * 1024 * 1024) {
      // Reduces dimensions by 10% recursively until the file is under 4MB as Vercel serverless limits file sizes to 4MB. It's not the best solution, and it will be improved in the near future.
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
