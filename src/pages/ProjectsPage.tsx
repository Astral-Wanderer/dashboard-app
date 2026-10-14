import { useState } from 'react';
import { mockProjects } from '../utils/mockData';
import type { Project, ProjectFormData } from '../types';
import { Link } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';

export default function ProjectsPage() {

    // local state for the prject list
    const [projects, setProjects] = useState<Project[]>(mockProjects);

    // Controls the visibility of the project form
    const [showForm, setShowForm] = useState(false);

    // Create a new project from the submitted form data
    function handleCreate(data: ProjectFormData) {
        const newProject: Project = {
            ...data,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };

        setProjects(prev => [...prev, newProject]);
        setShowForm(false);
    }

    function handleDelete(id: string) {
        setProjects(prev => prev.filter(p => p.id !== id));
    }

    return (
        <div>
            <h1>Projects</h1>

            {/* Open the project creation form */}
            <button onClick={() => setShowForm(true)}>
            Add Project
            </button>

            {/* Render the form when requested */}
            {showForm && (
            <ProjectForm
                onSubmit={handleCreate}
                onCancel={() => setShowForm(false)}
            />
            )}

            {/* Render projects with their delete actions */}
            {projects.map((p: Project) => (
                <div key={p.id}>
                    <Link 
                    to={`/projects/${p.id}`} 
                    style={{ textDecoration: 'none' }} 
                    >
                        <div className="card">
                            <h3>{p.name}</h3>
                            <p className="project-description">{p.description}</p>
                        </div>
                    </Link>

                    {/* Remove the selected project */}
                    <button onClick={() => handleDelete(p.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}