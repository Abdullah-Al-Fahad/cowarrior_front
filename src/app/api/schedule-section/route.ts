import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
      select: {
        scheduleSection: true,
      },
    });
    return NextResponse.json(settings?.scheduleSection);
  } catch (error) {
    console.error('Error fetching schedule section from db:', error);
    return NextResponse.json({ message: 'Error reading Schedule Section data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedScheduleSection = await request.json();
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        scheduleSection: updatedScheduleSection,
      },
    });
    return NextResponse.json({ message: 'Schedule Section data updated successfully', scheduleSection: updatedScheduleSection });
  } catch (error) {
    console.error('Error updating schedule section in db:', error);
    return NextResponse.json({ message: 'Error updating Schedule Section data' }, { status: 500 });
  }
}
