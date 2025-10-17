import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
      select: {
        gymFeaturesSection: true,
      },
    });
    return NextResponse.json(settings?.gymFeaturesSection);
  } catch (error) {
    console.error('Error fetching gym features section from db:', error);
    return NextResponse.json({ message: 'Error reading Gym Features Section data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedGymFeaturesSection = await request.json();
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        gymFeaturesSection: updatedGymFeaturesSection,
      },
    });
    return NextResponse.json({ message: 'Gym Features Section data updated successfully', gymFeaturesSection: updatedGymFeaturesSection });
  } catch (error) {
    console.error('Error updating gym features section in db:', error);
    return NextResponse.json({ message: 'Error updating Gym Features Section data' }, { status: 500 });
  }
}
