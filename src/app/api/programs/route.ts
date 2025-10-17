import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export async function GET() {
  try {
    const programs = await prisma.program.findMany();
    return NextResponse.json(programs);
  } catch (error) {
    console.error('Error reading programs:', error);
    return NextResponse.json({ message: 'Error reading programs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProgramData = await request.json();
    const newProgram = await prisma.program.create({
      data: {
        ...newProgramData,
        db_id: slugify(newProgramData.name),
      },
    });
    return NextResponse.json(newProgram, { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ message: 'Error creating program' }, { status: 500 });
  }
}
