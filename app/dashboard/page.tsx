import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from '../actions/projects';
import { prisma } from '@/lib/prisma';

interface Project {
  id: number;
  name: string;
  color: string;
}

export default async function DashboardPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Dashboard</h1>
       
      </div>

      <AddProjectForm />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((p: Project) => (
          <li
            key={p.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px',
            }}
          >
            {/* color */}
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: p.color,
                display: 'inline-block',
              }}
            />

            {/* name */}
            <a href={`/projects/${p.id}`}>{p.name}</a>

            {/* rename */}
            <form
              action={renameProject}
              style={{ display: 'flex', gap: '5px' }}
            >
              <input type="hidden" name="id" value={p.id} />
              <input type="hidden" name="color" value={p.color} />

              <input
                name="newName"
                placeholder="New name"
                style={{ padding: 4 }}
              />

              <button type="submit">✏️</button>
            </form>

            {/* delete */}
            <form action={deleteProject}>
              <input type="hidden" name="id" value={p.id} />
              <button
                type="submit"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 18,
                }}
              >
                🗑
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}