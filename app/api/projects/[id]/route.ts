import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

interface Project {
 id: string;
 name: string;
 color: string;
}

interface Database {
 projects: Project[];
 users: any[];
}

/**
 * Read the database file and return parsed JSON
 */
function readDB(): Database {
 const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
 return data;
}

/**
 * Write updated data to the database file
 */
function writeDB(data: Database): void {
 fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

/**
 * GET /api/projects/[id]
 * Retrieve a single project by ID
 */
export async function GET(
 request: Request,
 { params }: { params: Promise<{ id: string }> }
) {
 try {
 const { id } = await params;
 const db = readDB();
 const project = db.projects.find((p) => p.id === id);

 if (!project) {
 return NextResponse.json(
 { error: 'Project not found' },
 { status: 404 }
 );
 }

 return NextResponse.json(project);
 } catch (error) {
 return NextResponse.json(
 { error: 'Failed to fetch project' },
 { status: 500 }
 );
 }
}

/**
 * PUT /api/projects/[id]
 * Update a project's name and/or color
 */
export async function PUT(
 request: Request,
 { params }: { params: Promise<{ id: string }> }
) {
 try {
 const { id } = await params;
 const body = await request.json();
 const db = readDB();

 const projectIndex = db.projects.findIndex((p) => p.id === id);

 if (projectIndex === -1) {
 return NextResponse.json(
 { error: 'Project not found' },
 { status: 404 }
 );
 }

 // Update project with new data while preserving ID
 db.projects[projectIndex] = {
 id,
 name: body.name || db.projects[projectIndex].name,
 color: body.color || db.projects[projectIndex].color,
 };

 writeDB(db);

 return NextResponse.json(db.projects[projectIndex]);
 } catch (error) {
 return NextResponse.json(
 { error: 'Failed to update project' },
 { status: 500 }
 );
 }
}

/**
 * DELETE /api/projects/[id]
 * Remove a project by ID
 */
export async function DELETE(
 request: Request,
 { params }: { params: Promise<{ id: string }> }
) {
 try {
 const { id } = await params;
 const db = readDB();

 const projectIndex = db.projects.findIndex((p) => p.id === id);

 if (projectIndex === -1) {
 return NextResponse.json(
 { error: 'Project not found' },
 { status: 404 }
 );
 }

 db.projects.splice(projectIndex, 1);
 writeDB(db);

 return NextResponse.json({ success: true, message: 'Project deleted' });
 } catch (error) {
 return NextResponse.json(
 { error: 'Failed to delete project' },
 { status: 500 }
 );
 }
}
