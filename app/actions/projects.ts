'use server';
import { revalidatePath } from 'next/cache';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function addProject(formData: FormData) {
 const name = formData.get('name') as string;
 const color = formData.get('color') as string;
 await fetch(`${API_BASE}/projects`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ name, color }),
 });
 revalidatePath('/dashboard');
}



export async function deleteProject(formData: FormData) {
 const id = formData.get('id') as string;
 await fetch(`${API_BASE}/projects/${id}`, {
 method: 'DELETE',
 });
 revalidatePath('/dashboard');
}
export async function renameProject(formData: FormData) {
  const id = formData.get('id');
  const newName = formData.get('newName');
  const color = formData.get('color');

  await fetch(`http://localhost:4000/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: newName,
      color,
    }),
  });

  revalidatePath('/dashboard');
}