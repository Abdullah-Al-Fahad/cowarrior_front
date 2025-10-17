import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
      select: {
        scheduleHeroSection: true,
      },
    });
    const scheduleHeroSection = settings?.scheduleHeroSection || {
      backgroundImageUrl: '',
      mainHeadline: '',
      subHeadline: '',
    };
    return NextResponse.json(scheduleHeroSection);
  } catch (error) {
    console.error('Error fetching schedule hero section from db:', error);
    return NextResponse.json({ message: 'Error fetching schedule hero section data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedHeroData = await request.json();
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        scheduleHeroSection: updatedHeroData,
      },
    });
    return NextResponse.json({ message: 'Schedule Hero Section updated successfully!' });
  } catch (error) {
    console.error('Error updating schedule hero section in db:', error);
    return NextResponse.json({ message: 'Error updating schedule hero section' }, { status: 500 });
  }
}
