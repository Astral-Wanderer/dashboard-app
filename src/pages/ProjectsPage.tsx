import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PROJECT, DELETE_PROJECT } from '../graphql/mutations';
import { useState } from 'react';
import type { Project, ProjectFormData } from '../types';
import { Link } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
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

    const [createProject] = useMutation(CREATE_PROJECT, {
        refetchQueries: [{ query: GET_PROJECTS }],
    });

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        refetchQueries: [{ query: GET_PROJECTS }],
    });

    // Create a new project from the submitted form data
    async function handleCreate(data: ProjectFormData) {
        try {
            await createProject({
                variables: {
                    name: data.name,
                    description: data.description,
                },
            });

            setShowForm(false);
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Could not create project');
        }
    }

    async function handleDelete(id: string) {
        if (!window.confirm('Delete this project?')) {
            return;
        }

        try {
            await deleteProject({
                variables: { id },
            });
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Could not delete project');
        }
    }

    if (loading) return <LoadingSpinner />;

    if (error) {
        return <p style={{ color: 'red' }}>
            Error: {error.message}
        </p>;
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

            {projects.length === 0 && (
                <EmptyState message="No projects yet." />
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