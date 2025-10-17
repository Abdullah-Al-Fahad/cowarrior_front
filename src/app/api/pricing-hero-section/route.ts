import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
      select: {
        pricingHeroSection: true,
      },
    });
    const pricingHeroSection = settings?.pricingHeroSection || {
      backgroundImageUrl: '',
      mainHeadline: '',
      subHeadline: '',
    };
    return NextResponse.json(pricingHeroSection);
  } catch (error) {
    console.error('Error fetching pricing hero section from db:', error);
    return NextResponse.json({ message: 'Error fetching pricing hero section data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedHeroData = await request.json();
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        pricingHeroSection: updatedHeroData,
      },
    });
    return NextResponse.json({ message: 'Pricing Hero Section updated successfully!' });
  } catch (error) {
    console.error('Error updating pricing hero section in db:', error);
    return NextResponse.json({ message: 'Error updating pricing hero section' }, { status: 500 });
  }
}
