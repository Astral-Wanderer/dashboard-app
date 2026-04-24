import { mockProjects } from '../utils/mockData';
import type { Project } from '../types';

export default function ProjectsPage() {
    return (
        <div>
            <h1>Projects</h1>
            {mockProjects.map((p: Project) => (
                <div key={p.id} style={{background:'#fff', borderRadius:8, padding:16, marginBottom:12 }}>
                    <h3>{p.name}</h3>
                    <p style={{ color:'#64748B' }}>{p.description}</p>
                </div>
            ))}
        </div>
    );
}