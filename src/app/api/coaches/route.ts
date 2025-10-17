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
  const coaches = await prisma.coach.findMany();
  return NextResponse.json(coaches);
}

export async function POST(request: Request) {
  const newCoachData = await request.json();

  const newCoach = await prisma.coach.create({
    data: {
      ...newCoachData,
      db_id: slugify(newCoachData.name),
    },
  });

  return NextResponse.json(newCoach, { status: 201 });
}
