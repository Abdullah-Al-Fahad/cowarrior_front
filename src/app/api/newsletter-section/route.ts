import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
      select: {
        newsletterSection: true,
      },
    });
    return NextResponse.json(settings?.newsletterSection);
  } catch (error) {
    console.error('Error fetching newsletter section from db:', error);
    return NextResponse.json({ message: 'Error reading Newsletter Section data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedNewsletterSection = await request.json();
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        newsletterSection: updatedNewsletterSection,
      },
    });
    return NextResponse.json({ message: 'Newsletter Section data updated successfully', newsletterSection: updatedNewsletterSection });
  } catch (error) {
    console.error('Error updating newsletter section in db:', error);
    return NextResponse.json({ message: 'Error updating Newsletter Section data' }, { status: 500 });
  }
}
