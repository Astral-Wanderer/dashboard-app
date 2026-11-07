import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { TaskFormData } from '../../types';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../graphql/queries';

interface Props {
  initialData?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  creating?: boolean;
}

// Default values ensure every form field is controlled from the start
const DEFAULT: TaskFormData = {
    title: '',
    description: '',
    status: 'TODO',
    projectId: ''
};

export default function TaskForm({ initialData, onSubmit, onCancel, creating = false }: Props) {
    
    const { data, loading, error } = useQuery<{
        projects: { id: string; name: string }[];
    }>(GET_PROJECTS);

    const [errors, setErrors] =
    useState<Partial<Record<keyof TaskFormData, string>>>({});

    const projects = data?.projects ?? [];


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

        setErrors(prev => ({
            ...prev,
            [name]: undefined
        }));
    }

    function validate(data: TaskFormData) {
    const e: Partial<Record<keyof TaskFormData, string>> = {};

    if (!data.title.trim()) {
      e.title = 'Title is required';
    }

    if (!data.projectId) {
      e.projectId = 'Project is required';
    } else if (!projects.some(p => p.id === data.projectId)) {
      e.projectId = 'Please select a valid project';
    }

    return e;
  }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newErrors = validate(form);

        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
        }

        setErrors({});
        onSubmit({
        ...form,
        title: form.title.trim()
        });
    }

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                />

                {errors.title && (
                    <span style={{ color: 'red', fontSize: 12, display: 'block' }}>
                        {errors.title}
                    </span>
                )}
            </div>

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

            <div>
                <select
                    name="projectId"
                    value={form.projectId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a project</option>

                    {projects.map(project => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>

                {errors.projectId && (
                    <span style={{ color: 'red', fontSize: 12, display: 'block' }}>
                        {errors.projectId}
                    </span>
                )}

                {error && (
                    <span style={{ color: 'red', fontSize: 12, display: 'block' }}>
                        Error loading projects: {error.message}
                    </span>
                )}
            </div>

            <button
                type="submit"
                disabled={loading || !!error || creating}
            >
                {creating ? 'Saving...' : 'Save'}
            </button>
            
             <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}