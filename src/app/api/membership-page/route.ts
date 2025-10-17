import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const membershipPage = await prisma.membershipPage.findFirst({
      where: { id: 1 },
    });
    return NextResponse.json(membershipPage);
  } catch (error) {
    console.error('Error fetching membership page data:', error);
    return NextResponse.json({ error: 'Failed to fetch membership page data' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const newData = await req.json();
    await prisma.membershipPage.update({
      where: { id: 1 },
      data: newData,
    });
    return NextResponse.json({ message: 'Membership page data updated successfully' });
  } catch (error) {
    console.error('Error updating membership page data:', error);
    return NextResponse.json({ error: 'Failed to update membership page data' }, { status: 500 });
  }
}
