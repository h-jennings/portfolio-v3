/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TAGS } from '@/app/_utils/constants/cache.constants';
import { verifyWebhookSignature } from '@hygraph/utils';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const signature = headers().get('gcms-signature');
  const secret = process.env.CMS_WEBHOOK_SECRET;

  if (signature == null) {
    return NextResponse.json({
      status: 401,
      message: 'Signature does not exist',
    });
  }

  if (secret == null) {
    return NextResponse.json({
      status: 401,
      message: 'Invalid secret',
    });
  }

  const isValid = verifyWebhookSignature({ body, signature, secret });
  if (!isValid) {
    return NextResponse.json({
      status: 403,
      message: 'Signature is invalid',
    });
  }

  try {
    console.log(`[Next.js] Revalidating ${TAGS.projects}`);
    revalidateTag(TAGS.projects);

    const slug = body?.data?.slug;

    console.log(`[Next.js] Revalidating ${TAGS.project(slug as string)}`);
    revalidateTag(TAGS.project(slug as string));

    return NextResponse.json({
      status: 200,
      message: 'Successfully revalidated project cache',
      now: Date.now(),
    });
  } catch {
    return NextResponse.json({
      status: 500,
      message: 'Error revalidating',
    });
  }
}
