import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
      select: {
        teamPhotoSection: true,
      },
    });
    return NextResponse.json(settings?.teamPhotoSection);
  } catch (error) {
    console.error('Error fetching team photo section from db:', error);
    return NextResponse.json({ message: 'Error reading Team Photo Section data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedTeamPhotoSection = await request.json();
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        teamPhotoSection: updatedTeamPhotoSection,
      },
    });
    return NextResponse.json({ message: 'Team Photo Section data updated successfully', teamPhotoSection: updatedTeamPhotoSection });
  } catch (error) {
    console.error('Error updating team photo section in db:', error);
    return NextResponse.json({ message: 'Error updating Team Photo Section data' }, { status: 500 });
  }
}
