import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Status, TaskFormData } from '../../types';

interface Props {
    initialData?: Partial<TaskFormData>;
    onSubmit: (data: TaskFormData) => void;
    onCancel: () => void;
}

// Default values ensure every form field is controlled from the start
const DEFAULT: TaskFormData = {
    title: '',
    description: '',
    status: 'TODO',
    projectId: ''
};

export default function TaskForm({ initialData, onSubmit, onCancel }: Props) {
    
    const [form, setForm] = useState<TaskFormData>({
        ...DEFAULT,
        ...initialData
    });

    // Updates the matching form field based on the input's name
    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!form.title.trim()) {
            alert('Title is required');
            return;
        }

        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
            />

            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
            />

            <select
                name="status"
                value={form.status}
                onChange={handleChange}
            >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>

            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
    
}