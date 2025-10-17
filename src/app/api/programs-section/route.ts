import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
      select: {
        programsSection: true,
      },
    });
    return NextResponse.json(settings?.programsSection);
  } catch (error) {
    console.error('Error fetching programs section from db:', error);
    return NextResponse.json({ message: 'Error reading Programs Section data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedProgramsSection = await request.json();
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        programsSection: updatedProgramsSection,
      },
    });
    return NextResponse.json({ message: 'Programs Section data updated successfully', programsSection: updatedProgramsSection });
  } catch (error) {
    console.error('Error updating programs section in db:', error);
    return NextResponse.json({ message: 'Error updating Programs Section data' }, { status: 500 });
  }
}
