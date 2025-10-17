import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Force dynamic rendering
    const _ = request.headers;
    const id = parseInt(params.id, 10);
    const scheduleItem = await prisma.schedule.findUnique({
      where: { db_id: id },
    });

    if (!scheduleItem) {
      return NextResponse.json({ message: 'Schedule item not found' }, { status: 404 });
    }

    return NextResponse.json(scheduleItem);
  } catch (error) {
    console.error('Error fetching schedule item:', error);
    return NextResponse.json({ message: 'Error fetching schedule item' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Force dynamic rendering
    const _ = request.headers;
    const id = parseInt(params.id, 10);
    const updatedItem = await request.json();

    const scheduleItem = await prisma.schedule.update({
      where: { db_id: id },
      data: updatedItem,
    });

    return NextResponse.json(scheduleItem);
  } catch (error) {
    console.error('Error updating schedule item:', error);
    return NextResponse.json({ message: 'Error updating schedule item' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Force dynamic rendering
    const _ = request.headers;
    const id = parseInt(params.id, 10);
    await prisma.schedule.delete({
      where: { db_id: id },
    });

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error('Error deleting schedule item:', error);
    return NextResponse.json({ message: 'Error deleting schedule item' }, { status: 500 });
  }
}
