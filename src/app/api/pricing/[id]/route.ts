import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Force dynamic rendering
    const _ = request.headers;
    const id = params.id;
    if (id === 'null') {
      return NextResponse.json({ message: 'Invalid ID provided' }, { status: 400 });
    }

    const pricingTier = await prisma.pricingTier.findUnique({
      where: { db_id: id },
      include: { pricing: true },
    });

    if (pricingTier) {
      const { pricing, ...tier } = pricingTier;
      const sectionInfo = pricing ? { id: pricing.db_id, title: pricing.title } : null;
      return NextResponse.json({ tier, section: sectionInfo });
    } else {
      return NextResponse.json({ message: 'Pricing tier not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching pricing tier:', error);
    return NextResponse.json({ message: 'Error fetching pricing tier' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Force dynamic rendering
    const _ = request.headers;
    const id = params.id;
    if (id === 'null') {
      return NextResponse.json({ message: 'Invalid ID provided' }, { status: 400 });
    }
    const { sectionId, ...updatedTierData } = await request.json();

    if (!sectionId) {
      return NextResponse.json({ message: 'sectionId is required' }, { status: 400 });
    }

    const newParentPricing = await prisma.pricing.findUnique({
        where: { db_id: sectionId },
    });

    if (!newParentPricing) {
        return NextResponse.json({ message: 'New section not found' }, { status: 404 });
    }

    await prisma.pricingTier.update({
      where: { db_id: id },
      data: {
        ...updatedTierData,
        pricingId: newParentPricing.id,
      },
    });

    return NextResponse.json({ message: 'Pricing tier updated successfully' });
  } catch (error) {
    console.error('Error updating pricing tier:', error);
    return NextResponse.json({ message: 'Error updating pricing tier' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Force dynamic rendering
    const _ = request.headers;
    const id = params.id;
    if (id === 'null') {
      return NextResponse.json({ message: 'Invalid ID provided' }, { status: 400 });
    }

    await prisma.pricingTier.delete({ where: { db_id: id } });

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error('Error deleting pricing tier:', error);
    return NextResponse.json({ message: 'Error deleting pricing tier' }, { status: 500 });
  }
}
