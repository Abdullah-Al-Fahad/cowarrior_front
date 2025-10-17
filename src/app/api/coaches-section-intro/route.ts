import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
      select: {
        coachesSectionIntro: true,
      },
    });
    return NextResponse.json(settings?.coachesSectionIntro);
  } catch (error) {
    console.error('Error fetching coaches section intro from db:', error);
    return NextResponse.json({ message: 'Error fetching Coaches Section Intro data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedCoachesSectionIntro = await request.json();
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        coachesSectionIntro: updatedCoachesSectionIntro,
      },
    });
    return NextResponse.json({ message: 'Coaches Section Intro data updated successfully', coachesSectionIntro: updatedCoachesSectionIntro });
  } catch (error) {
    console.error('Error updating coaches section intro in db:', error);
    return NextResponse.json({ message: 'Error updating Coaches Section Intro data' }, { status: 500 });
  }
}
