import { useParams } from 'react-router-dom';
import { mockProjects, mockTasks } from '../utils/mockData';
import StatusBadge from '../components/StatusBadge';

export default function ProjectDetailPage() {
    const { id } = useParams<{ id: string }>();
    const project = mockProjects.find(p => p.id === id);
    const tasks = mockTasks.filter(t => t.projectId === id);
    if (!project) return <p>Project not found.</p>;
    return (
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <h2>Tasks ({tasks.length})</h2>
            {tasks.map(t => (
                <div key={t.id} style={{ display:'flex', justifyContent:'space-between', padding:12, background:'#fff', borderRadius:8, marginBottom:8 }}>
                    <span>{t.title}</span>
                    <StatusBadge status={t.status} />
                </div>
            ))}
        </div>
    );
}
