import { mockProjects } from '../utils/mockData';
import type { Project } from '../types';
import { Link } from 'react-router-dom';

export default function ProjectsPage() {
    return (
        <div>
            <h1>Projects</h1>

            {mockProjects.map((p: Project) => (
                <Link 
                to={`/projects/${p.id}`} 
                style={{ textDecoration: 'none' }} 
                key={p.id}
                >
                    <div className="card">
                        <h3>{p.name}</h3>
                        <p className="project-description">{p.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}