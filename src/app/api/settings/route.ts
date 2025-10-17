import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings data:', error);
    return NextResponse.json({ message: 'Error fetching settings data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const newSettings = await request.json();
    const updatedSettings = await prisma.settings.update({
      where: { id: 1 },
      data: newSettings,
    });
    return NextResponse.json(updatedSettings, { status: 200 });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ message: 'Error updating settings' }, { status: 500 });
  }
}
