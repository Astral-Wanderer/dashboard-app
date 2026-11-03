import { useParams } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../graphql/queries';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Project, Task } from '../types';

export default function ProjectDetailPage() {

    const { id } = useParams<{ id: string }>();

    const { loading, error, data } = useQuery<{
    project: (Project & { tasks: Task[] }) | null;
    }>(GET_PROJECT, {
    variables: { id },
    skip: !id,
    });

    if (!id) return <p>Project ID missing.</p>;

    if (loading) return <LoadingSpinner />;

    if (error) {
    return <p>Error: {error.message}</p>;
    }

    if (!data?.project) {
    return <p>Project not found.</p>;
    }

    const { project } = data;

    if (!project) return <p>Project not found.</p>;

    return (
        <div>
            <h1>{project.name}</h1>

            <p>{project.description}</p>

            <h2>Tasks</h2>

            {project.tasks.length === 0 ? (
            <p>No tasks yet.</p>
            ) : (
            project.tasks.map(task => (
                <div key={task.id}>
                <strong>{task.title}</strong>
                <span> – {task.status}</span>
                </div>
            ))
            )}
        </div>
    );
}
