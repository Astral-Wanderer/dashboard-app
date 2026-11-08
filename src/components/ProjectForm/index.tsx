import { useState, type FormEvent } from 'react';
import type { ProjectFormData } from '../../types';

interface Props {
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  creating?: boolean;
}

export default function ProjectForm({ onSubmit, onCancel, creating = false }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Submit the entered project data
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) return;

    onSubmit({ name, description });
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Project information fields */}
      <input
        placeholder="Project name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Project description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      {/* Form actions */}
      <button type="button" onClick={onCancel}>
        Cancel
      </button>

      <button type="submit" disabled={creating}>
        {creating ? 'Saving...' : 'Create Project'}
      </button>
    </form>
  );
}