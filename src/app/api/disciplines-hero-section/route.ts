import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const disciplinesHeroSection = await prisma.disciplinesHeroSection.findFirst({
      where: { id: 1 },
    });
    return NextResponse.json(disciplinesHeroSection);
  } catch (error) {
    console.error('Error reading disciplinesHeroSection:', error);
    return NextResponse.json({ message: 'Error reading disciplines hero section' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedSection = await request.json();
    const disciplinesHeroSection = await prisma.disciplinesHeroSection.update({
      where: { id: 1 },
      data: updatedSection,
    });
    return NextResponse.json(disciplinesHeroSection);
  } catch (error) {
    console.error('Error updating disciplinesHeroSection:', error);
    return NextResponse.json({ message: 'Error updating disciplines hero section' }, { status: 500 });
  }
}
