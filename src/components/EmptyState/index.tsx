interface Props { message: string }

export default function EmptyState({ message }: Props) {
    return (
        <div 
            style={{ 
                textAlign: 'center',
                padding: 48,
                color: '#94A3B8'
            }}
        >
            <p style={{ fontSize: 16 }}>{message}</p>  
        </div>
    );
}