import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
      select: {
        cta: true,
      },
    });
    return NextResponse.json(settings?.cta);
  } catch (error) {
    console.error('Error fetching cta from db:', error);
    return NextResponse.json({ message: 'Error reading CTA data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedCta = await request.json();
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        cta: updatedCta,
      },
    });
    return NextResponse.json({ message: 'CTA data updated successfully', cta: updatedCta });
  } catch (error) {
    console.error('Error updating cta in db:', error);
    return NextResponse.json({ message: 'Error updating CTA data' }, { status: 500 });
  }
}
