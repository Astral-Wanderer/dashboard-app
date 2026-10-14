import "./style.css";
import type { Status } from '../../types';

const COLORS: Record<Status, string> = {
    TODO: 'var(--text-secondary)',
    IN_PROGRESS: 'var(--warning)',
    DONE: 'var(--success)',
};

// Background colors for each task status
const BACKGROUNDS: Record<Status, string> = {
  TODO: 'var(--status-todo-bg)',
  IN_PROGRESS: 'var(--status-in-progress-bg)',
  DONE: 'var(--status-done-bg)',
};

interface Props { status: Status }
export default function StatusBadge({ status }: Props) {
    return (
        <span 
            className="status-badge"
            style={{
                background: BACKGROUNDS[status],
                color: COLORS[status],
            }}
        >
            {status.replace('_', ' ')}
        </span>
    );
}
