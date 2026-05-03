import type { Status } from '../types';

const COLORS: Record<Status, string> = {
    TODO: '#64748B',
    IN_PROGRESS: '#D97706',
    DONE: '#059669',
};

interface Props { status: Status }
export default function StatusBadge({ status }: Props) {
    return (
        <span style={{
            background: COLORS[status] + '22',
            color: COLORS[status],
            borderRadius: 999, padding: '2px 10px', fontSize: 12, fontWeight: 600
        }}>
            {status.replace('_', ' ')}
        </span>
    );
}
