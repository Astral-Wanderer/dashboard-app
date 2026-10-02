import "./style.css";
import type { Status } from '../../types';

const COLORS: Record<Status, string> = {
    TODO: '#64748B',
    IN_PROGRESS: '#D97706',
    DONE: '#059669',
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
