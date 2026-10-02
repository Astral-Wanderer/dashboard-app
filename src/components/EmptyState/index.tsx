import "./style.css";
interface Props { message: string }

export default function EmptyState({ message }: Props) {
    return (
        <div className="empty-state">
            <p className="empty-state-message">{message}</p>  
        </div>
    );
}