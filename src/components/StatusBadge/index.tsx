import "./style.css";
import type { Status } from '../../types';

const COLORS: Record<Status, string> = {
    TODO: 'var(--text-secondary)',
    IN_PROGRESS: 'var(--warning)',
    DONE: 'var(--success)',
};

interface Props { status: Status }
export default function StatusBadge({ status }: Props) {
    return (
        <span 
            className="status-badge"
            style={{
                background: COLORS[status] + "22",
                color: COLORS[status],
            }}
        >
            {status.replace('_', ' ')}
        </span>
    );
}
