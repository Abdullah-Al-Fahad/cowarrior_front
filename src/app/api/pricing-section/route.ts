import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
      select: {
        pricingSection: true,
      },
    });
    return NextResponse.json(settings?.pricingSection);
  } catch (error) {
    console.error('Error fetching pricing section from db:', error);
    return NextResponse.json({ message: 'Error reading Pricing Section data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedPricingSection = await request.json();
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        pricingSection: updatedPricingSection,
      },
    });
    return NextResponse.json({ message: 'Pricing Section data updated successfully', pricingSection: updatedPricingSection });
  } catch (error) {
    console.error('Error updating pricing section in db:', error);
    return NextResponse.json({ message: 'Error updating Pricing Section data' }, { status: 500 });
  }
}
