import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Force dynamic rendering
    const _ = request.headers;
    const { id } = params;
    const program = await prisma.program.findUnique({
      where: { db_id: id },
    });

    if (program) {
      return NextResponse.json(program);
    } else {
      return NextResponse.json({ message: 'Program not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error reading program:', error);
    return NextResponse.json({ message: 'Error reading program' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Force dynamic rendering
    const _ = request.headers;
    const { id } = params;
    const updatedProgram = await request.json();
    const program = await prisma.program.update({
      where: { db_id: id },
      data: updatedProgram,
    });
    return NextResponse.json(program);
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ message: 'Error updating program' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Force dynamic rendering
    const _ = request.headers;
    const { id } = params;
    await prisma.program.delete({
      where: { db_id: id },
    });
    return NextResponse.json({ message: 'Program deleted successfully' });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ message: 'Error deleting program' }, { status: 500 });
  }
}
