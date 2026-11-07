import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSearchText, setStatusFilter } from '../features/uiSlice';
import { selectSearchText, selectStatusFilter } from '../features/uiSelectors';
import { openTaskModal, closeTaskModal } from '../features/uiSlice';
import { selectTaskModalOpen } from '../features/uiSelectors';
import Modal from '../components/Modal';
import { useState } from 'react';
import type { Task, TaskFormData, Status } from '../types';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../graphql/queries';
import TaskForm from '../components/TaskForm';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { useMutation } from '@apollo/client';

import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from '../graphql/mutations';


export default function TasksPage() {

    const { loading, error, data } = useQuery<{
        tasks: Task[];
    }>(GET_TASKS);

    const tasks = data?.tasks ?? [];

    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // Search and status filter states
    const dispatch = useAppDispatch();
    const searchText = useAppSelector(selectSearchText);
    const statusFilter = useAppSelector(selectStatusFilter);

    const taskModalOpen = useAppSelector(selectTaskModalOpen);

    // GraphQL Mutations
    const [
        createTask,
        { loading: creating, error: createError }
    ] = useMutation(CREATE_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    });

    const [updateTask, { loading: updating, error: updateError }] =
        useMutation(UPDATE_TASK, {
            refetchQueries: [{ query: GET_TASKS }],
    });

    const [deleteTask, { loading: deleting, error: deleteError }] =
        useMutation(DELETE_TASK, {
            refetchQueries: [{ query: GET_TASKS }],
    });

    // Filter tasks
    const filteredTasks = tasks.filter(t => {
        const matchSearch = t.title.toLowerCase().includes(searchText.toLowerCase());
        const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;
        return matchSearch && matchStatus;
    });
    
    async function handleCreate(data: TaskFormData) {
        try {
            await createTask({
                variables: { ...data }
            });

        dispatch(closeTaskModal());
        } catch (err) {
            console.error('Create task failed:', err);
        }
    }

    async function handleUpdate(data: TaskFormData) {
        if (!editingTask) return;

        try {
            await updateTask({
                variables: {
                    id: editingTask.id,
                    title: data.title,
                    description: data.description,
                    status: data.status,
                },
            });

            setEditingTask(null);
            dispatch(closeTaskModal());
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    async function handleDelete(id: string) {
        try {
            await deleteTask({
                variables: { id },
            });
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }


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
                    creating={editingTask ? updating : creating}
                    onCancel={() => {
                        dispatch(closeTaskModal());
                        setEditingTask(null);
                    }}
                />

                {createError && !editingTask && (
                    <p style={{ color: 'red', fontSize: 12 }}>
                        {createError.message}
                    </p>
                )}

                {updateError && editingTask && (
                    <p style={{ color: 'red' }}>
                        {updateError.message}
                    </p>
                )}

            </Modal>

            {filteredTasks.length === 0 && (
                <EmptyState message="No tasks found." />
            )}
            
            {/* Render tasks matching the search and status filter */}
            {filteredTasks.map(task => (
                <div key={task.id} className="card">
                    <div className="task-row">
                        <strong>{task.title}</strong>
                        <StatusBadge status={task.status} />
                    </div>

                    <button onClick={() => setEditingTask(task)}>Edit</button>
                    <button
                        onClick={() => handleDelete(task.id)}
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            ))}

            {deleteError && (
                <p style={{ color: 'red' }}>
                    {deleteError.message}
                </p>
            )}
        </div>
    );
}
