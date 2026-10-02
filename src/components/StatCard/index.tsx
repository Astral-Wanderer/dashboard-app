import "./style.css";
interface Props {
    label: string;
    value: number;
    color?: string;
}

export default function StatCard({ label, value, color = '#2563EB' }: Props) {
    return (
        <div className="stat-card">
            <p className="stat-card-label">{label}</p>
            <p className="stat-card-value" style={{ color }}>{value}</p>
        </div>
    );
}