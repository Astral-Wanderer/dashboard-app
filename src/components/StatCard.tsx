interface Props {
    label: string;
    value: number;
    color?: string;
}

export default function StatCard({ label, value, color = '#2563EB' }: Props) {
    return (
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 4px #0001' }}>
            <p style={{ color: '#64748B', fontSize: 13 }}>{label}</p>
            <p style={{ color, fontSize: 28, fontWeight: 700 }}>{value}</p>
        </div>
    );
}