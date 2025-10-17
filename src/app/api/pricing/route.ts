import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const pricing = await prisma.pricing.findMany({
      include: { tiers: true },
    });
    return NextResponse.json(pricing);
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    return NextResponse.json({ message: 'Error fetching pricing data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { sectionId, newSectionTitle, tier } = await request.json();

    if (!sectionId || !tier) {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    let pricingSection = await prisma.pricing.findUnique({
      where: { db_id: sectionId },
    });

    if (!pricingSection) {
      if (!newSectionTitle) {
        return NextResponse.json({ message: 'newSectionTitle is required for a new section' }, { status: 400 });
      }
      pricingSection = await prisma.pricing.create({
        data: {
          db_id: sectionId,
          title: newSectionTitle,
        },
      });
    }

    const newTier = await prisma.pricingTier.create({
      data: {
        ...tier,
        pricing: {
          connect: { id: pricingSection.id },
        },
      },
    });

    return NextResponse.json(newTier, { status: 201 });
  } catch (error) {
    console.error('Error adding new pricing tier:', error);
    return NextResponse.json({ message: 'Error adding new pricing tier' }, { status: 500 });
  }
}
