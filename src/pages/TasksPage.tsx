import { mockTasks } from '../utils/mockData';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function TasksPage() {
    const isLoading = false; // will become a real query state in Week 5

    if (isLoading) return <LoadingSpinner />;
    if (mockTasks.length === 0) return <EmptyState message='No tasks found.' />;

    return (
        <div>
            <h1>Tasks</h1>
            
            {mockTasks.map(task => (
                <div 
                    key={task.id} 
                    style={{ 
                        background:'#fff', 
                        borderRadius:8, 
                        padding:16, 
                        marginBottom:12 
                    }}
                >
                    <div 
                        style={{ 
                            display:'flex', 
                            justifyContent:'space-between' 
                        }}
                    >
                        <strong>{task.title}</strong>
                        <StatusBadge status={task.status} />
                    </div>
                </div>
            ))}
        </div>
    );
}
