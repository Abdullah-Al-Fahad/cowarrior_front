import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const whyChooseUs = await prisma.whyChooseUs.findFirst({
    where: { id: 1 },
  });
  return NextResponse.json(whyChooseUs);
}
