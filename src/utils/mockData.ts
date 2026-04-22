import type { Project, Task } from '../types';

export const mockProjects: Project[] = [
    { id: '1', name: 'Alpha', description: 'First project', createdAt: '2024-01-01'},
    { id: '2', name: 'Beta', description: 'Second project', createdAt: '2024-02-01'},
];

export const mockTasks: Task[] = [
    { id: '1', title: 'Setup repo', status: 'DONE', projectId: '1', description: '', createdAt: '2024-01-02'},
    { id: '2', title: 'Design DB', status: 'IN_PROGRESS', projectId: '1', description: '', createdAt: '2024-01-03'},
    { id: '3', title: 'Write tests', status: 'TODO', projectId: '2', description: '', createdAt: '2024-02-02'},
];