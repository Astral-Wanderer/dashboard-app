export default function LoadingSpinner() {
    return (
        <div 
            style={{ 
                display:'flex', 
                justifyContent:'center', 
                padding: 48
            }}
        >
            <div 
                style={{
                    width: 32, 
                    height: 32,
                    borderRadius: '50%',
                    border: '3px solid #E2E8F0',
                    borderTopColor: '#2563EB',
                    animation: 'spin 0.8s linear infinite'
                }} 
            />
        </div>
    );
}