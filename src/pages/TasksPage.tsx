import { useState } from 'react';
import type { Task, TaskFormData } from '../types';
import { mockTasks } from '../utils/mockData';
import TaskForm from '../components/TaskForm';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function TasksPage() {

    // Local state for the task list and form visibility
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [showForm, setShowForm] = useState(false);

    const isLoading = false; // will become a real query state in Week 5

    // Create a new task from the submitted form data
    function handleCreate(data: TaskFormData) {
        const newTask: Task = {
            ... data,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };

        setTasks(prev => [...prev, newTask]);
        setShowForm(false);
    }

    function handleDelete(id: string) {
        setTasks(prev => prev.filter(t => t.id !== id));
    }

    if (isLoading) return <LoadingSpinner />;
    if (tasks.length === 0) return <EmptyState message='No tasks found.' />;

    return (
        <div>
            <h1>Tasks</h1>

            <button onClick={() => setShowForm(true)}>+ New Task</button>

            {showForm && (
                <TaskForm
                    onSubmit={handleCreate}
                    onCancel={() => setShowForm(false)}
                />
            )}
            
            {tasks.map(task => (
                <div key={task.id} className="card">
                    <div className="task-row">
                        <strong>{task.title}</strong>
                        <StatusBadge status={task.status} />
                    </div>

                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
