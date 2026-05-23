import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
 const { searchParams } = new URL(request.url);
 const email = searchParams.get('email');

 if (email) {
   const users = await prisma.user.findMany({
     where: { email },
   });
   return NextResponse.json(users);
 }

 const users = await prisma.user.findMany();
 return NextResponse.json(users);
}
