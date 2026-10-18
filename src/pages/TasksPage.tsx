import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSearchText, setStatusFilter } from '../features/uiSlice';
import { selectSearchText, selectStatusFilter } from '../features/uiSelectors';
import { openTaskModal, closeTaskModal } from '../features/uiSlice';
import { selectTaskModalOpen } from '../features/uiSelectors';
import Modal from '../components/Modal';
import { useState } from 'react';
import type { Task, TaskFormData, Status } from '../types';
import { mockTasks } from '../utils/mockData';
import TaskForm from '../components/TaskForm';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function TasksPage() {

    // Local state for the task list and form visibility
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // Search and status filter states
    const dispatch = useAppDispatch();
    const searchText = useAppSelector(selectSearchText);
    const statusFilter = useAppSelector(selectStatusFilter);

    const taskModalOpen = useAppSelector(selectTaskModalOpen);

    const filteredTasks = tasks.filter(t => {
        const matchSearch = t.title.toLowerCase().includes(searchText.toLowerCase());
        const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const isLoading = false; // will become a real query state in Week 5

    // Create a new task from the submitted form data
    function handleCreate(data: TaskFormData) {
        const newTask: Task = {
            ... data,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };

        setTasks(prev => [...prev, newTask]);
        dispatch(closeTaskModal());
    }

    function handleUpdate(data: TaskFormData) {
        if (!editingTask) return;

        setTasks(prev => prev.map(t =>
            t.id === editingTask.id ? { ...t, ...data} : t
        ));

        setEditingTask(null);
        dispatch(closeTaskModal());
    }

    function handleDelete(id: string) {
        setTasks(prev => prev.filter(t => t.id !== id));
    }

    if (isLoading) return <LoadingSpinner />;
    if (tasks.length === 0) return <EmptyState message='No tasks found.' />;

    return (
        <div>
            <h1>Tasks</h1>

            <button onClick={() => dispatch(openTaskModal())}>+ New Task</button>

            {/* Search and status filters */}
            <input
                placeholder='Search tasks...'
                value={searchText}
                onChange={e => dispatch(setSearchText(e.target.value))}
            />

            <select
                value={statusFilter}
                onChange={e => dispatch(setStatusFilter(e.target.value as Status | 'ALL'))}
            >
                <option value="ALL">All Statuses</option>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>
        
            {/* Display the task form inside a modal */}
            <Modal
                isOpen={taskModalOpen || !!editingTask}
                onClose={() => {
                    dispatch(closeTaskModal());
                    setEditingTask(null);
                }}
                title={editingTask ? 'Edit Task' : 'New Task'}
            >
                <TaskForm
                    initialData={editingTask ?? undefined}
                    onSubmit={editingTask ? handleUpdate : handleCreate}
                    onCancel={() => {
                        dispatch(closeTaskModal());
                        setEditingTask(null);
                    }}
                />
            </Modal>

            
            {/* Render tasks matching the search and status filter */}
            {filteredTasks.map(task => (
                <div key={task.id} className="card">
                    <div className="task-row">
                        <strong>{task.title}</strong>
                        <StatusBadge status={task.status} />
                    </div>

                    <button onClick={() => setEditingTask(task)}>Edit</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
