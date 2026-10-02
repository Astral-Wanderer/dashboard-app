import { mockTasks, mockProjects } from "../utils/mockData";
import StatCard from '../components/StatCard';

export default function DashboardPage() {
    const total = mockTasks.length;
    const done = mockTasks.filter(t => t.status === 'DONE').length;
    const inProg = mockTasks.filter(t => t.status === 'IN_PROGRESS').length;
    const todo = mockTasks.filter(t => t.status === 'TODO').length;
    return (
        <div>
            <h1>Overview</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16}}>
                <StatCard label='Total Tasks' value={total} />
                <StatCard label='Done' value={done} color="var(--success)" />
                <StatCard label='In Progress' value={inProg} color="var(--warning)" />
                <StatCard label='To Do' value={todo} color="var(--text-secondary)" />
            </div>
        </div>
    );

}