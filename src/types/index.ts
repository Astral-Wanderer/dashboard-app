export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: Status;
    projectId: string;
    createdAt: string;
}