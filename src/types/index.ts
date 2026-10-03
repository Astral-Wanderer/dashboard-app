export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

// Represents a complete task stored in the application
export interface Task {
    id: string;
    title: string;
    description: string;
    status: Status;
    projectId: string;
    createdAt: string;
}

// Represents the user-editable data of the task form
export interface TaskFormData {
    title: string;
    description: string;
    status: Status;
    projectId: string;
}