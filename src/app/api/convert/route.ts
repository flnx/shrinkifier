import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { buffer } from 'stream/consumers';
// import { put } from '@vercel/blob';

// const nanoid = customAlphabet(
//   '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
//   7
// ) // 7-character random string

export async function POST(req: Request) {
  const blob = await req.blob();

  const arrayBuffer = await blob.arrayBuffer();
  const webpBuffer = await sharp(arrayBuffer).webp({ quality: 70}).toBuffer();

  const metadata = await sharp(webpBuffer).metadata();

  console.log(metadata)

  return Response.json({
    arrayBuffer: webpBuffer
  })

  // return NextResponse.
}
