import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { slug:string } }) {
  try {
    // Force dynamic rendering
    const _ = request.headers;
    const slug = params.slug;
    const coach = await prisma.coach.findUnique({
      where: { id: slug },
    });

    if (!coach) {
      return NextResponse.json({ message: 'Coach not found' }, { status: 404 });
    }

    return NextResponse.json(coach);
  } catch (error) {
    console.error('Error fetching coach:', error);
    return NextResponse.json({ message: 'Error fetching coach' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    // Force dynamic rendering
    const _ = request.headers;
    const slug = params.slug;
    const updatedCoachData = await request.json();

    const updatedCoach = await prisma.coach.update({
      where: { id: slug },
      data: updatedCoachData,
    });

    return NextResponse.json(updatedCoach);
  } catch (error) {
    console.error('Error updating coach:', error);
    return NextResponse.json({ message: 'Error updating coach' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    // Force dynamic rendering
    const _ = request.headers;
    const slug = params.slug;
    await prisma.coach.delete({
      where: { id: slug },
    });

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error('Error deleting coach:', error);
    return NextResponse.json({ message: 'Error deleting coach' }, { status: 500 });
  }
}
