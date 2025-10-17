import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
      select: {
        imageSectionTraining: true,
      },
    });
    return NextResponse.json(settings?.imageSectionTraining);
  } catch (error) {
    console.error('Error fetching image section training from db:', error);
    return NextResponse.json({ message: 'Error reading Image Section Training data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedImageSectionTraining = await request.json();
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        imageSectionTraining: updatedImageSectionTraining,
      },
    });
    return NextResponse.json({ message: 'Image Section Training data updated successfully', imageSectionTraining: updatedImageSectionTraining });
  } catch (error) {
    console.error('Error updating image section training in db:', error);
    return NextResponse.json({ message: 'Error updating Image Section Training data' }, { status: 500 });
  }
}
