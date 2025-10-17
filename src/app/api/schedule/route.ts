import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const schedule = await prisma.schedule.findMany();
    return NextResponse.json(schedule);
  } catch (error) {
    console.error('Error fetching schedule data:', error);
    return NextResponse.json({ message: 'Error fetching schedule data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newScheduleItemData = await request.json();

    const lastItem = await prisma.schedule.findFirst({
      orderBy: {
        db_id: 'desc',
      },
    });

    const newDbId = lastItem ? lastItem.db_id + 1 : 1;

    const newScheduleItem = await prisma.schedule.create({
      data: {
        ...newScheduleItemData,
        db_id: newDbId,
        datetime: new Date(newScheduleItemData.datetime),
      },
    });

    return NextResponse.json(newScheduleItem, { status: 201 });
  } catch (error) {
    console.error('Error adding new schedule item:', error);
    return NextResponse.json({ message: 'Error adding new schedule item' }, { status: 500 });
  }
}
