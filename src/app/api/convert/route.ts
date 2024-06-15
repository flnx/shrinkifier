import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // const body = await req

  return NextResponse.json(null, { status: 200 });
}
