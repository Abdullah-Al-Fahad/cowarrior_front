import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
      select: {
        coachesHeroSection: true,
      },
    });
    const coachesHeroSection = settings?.coachesHeroSection || {
      backgroundImageUrl: '',
      mainHeadline: '',
      subHeadline: '',
    };
    return NextResponse.json(coachesHeroSection);
  } catch (error) {
    console.error('Error fetching coaches hero section from db:', error);
    return NextResponse.json({ message: 'Error fetching coaches hero section data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedHeroData = await request.json();
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        coachesHeroSection: updatedHeroData,
      },
    });
    return NextResponse.json({ message: 'Coaches Hero Section updated successfully!' });
  } catch (error) {
    console.error('Error updating coaches hero section in db:', error);
    return NextResponse.json({ message: 'Error updating coaches hero section' }, { status: 500 });
  }
}
