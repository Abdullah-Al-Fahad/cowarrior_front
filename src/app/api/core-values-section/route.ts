import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
      select: {
        coreValuesSection: true,
      },
    });
    return NextResponse.json(settings?.coreValuesSection);
  } catch (error) {
    console.error('Error fetching core values section from db:', error);
    return NextResponse.json({ message: 'Error reading Core Values Section data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedCoreValuesSection = await request.json();
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        coreValuesSection: updatedCoreValuesSection,
      },
    });
    return NextResponse.json({ message: 'Core Values Section data updated successfully', coreValuesSection: updatedCoreValuesSection });
  } catch (error) {
    console.error('Error updating core values section in db:', error);
    return NextResponse.json({ message: 'Error updating Core Values Section data' }, { status: 500 });
  }
}
