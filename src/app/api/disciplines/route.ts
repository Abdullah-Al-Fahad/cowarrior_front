import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const programs = await prisma.program.findMany({
    select: {
      db_id: true,
      name: true,
    },
  });
  const disciplines = programs.map((program) => ({ id: program.db_id, name: program.name }));
  return NextResponse.json(disciplines);
}
