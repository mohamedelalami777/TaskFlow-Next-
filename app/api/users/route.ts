import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

function readDB() {
 const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
 return data;
}

export async function GET(request: Request) {
 const db = readDB();
 const { searchParams } = new URL(request.url);
 const email = searchParams.get('email');
 
 if (email) {
 const users = db.users.filter((u: any) => u.email === email);
 return NextResponse.json(users);
 }
 
 return NextResponse.json(db.users);
}
