import { useState } from 'react';
import type { Project, ProjectFormData } from '../types';
import { Link } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import { useQuery } from '@apollo/client/react';
import { GET_PROJECTS } from '../graphql/queries';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function ProjectsPage() {

    const { loading, error, data } = useQuery<{
        projects: Project[];
    }>(GET_PROJECTS);

    const projects = data?.projects ?? [];

    // Controls the visibility of the project form
    const [showForm, setShowForm] = useState(false);

    // Create a new project from the submitted form data
    function handleCreate(data: ProjectFormData) {
        console.log('Create project:', data);
        setShowForm(false);
    }

    function handleDelete(id: string) {
        console.log('Delete project:', id);
    }

    if (loading) return <LoadingSpinner />;

    if (error) {
        return <p style={{ color: 'red' }}>
            Error: {error.message}
        </p>;
    }

    if (projects.length === 0) {
        return <EmptyState message="No projects yet." />;
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