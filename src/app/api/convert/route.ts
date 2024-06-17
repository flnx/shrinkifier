import { Format } from '@/types/FileData';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

const FORMATS = ['PNG', 'JPEG', 'WEBP'];
const TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export async function POST(req: Request) {
  const selectedFormat = req.headers.get('u-format') || '';
  const headers = req.headers.get('content-type') || '';

  try {
    if (!FORMATS.includes(selectedFormat) || !TYPES.includes(headers)) {
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
        newBuffer = await sharp(arrayBuffer).png({ quality: 70 }).toBuffer();
        break;
      }

      default:
        throw new Error('The requested format is not supported');
    }

    const metadata = await sharp(newBuffer).metadata();

    return Response.json(
      {
        arrayBuffer: newBuffer,
      },
      {
        headers: {
          'Content-Type': `image/${metadata.format}`,
        },
        status: 200,
      }
    );
  } catch (err: unknown) {
    const eMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: eMsg }, { status: 400 });
  }
}
