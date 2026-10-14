
import { ReactNode } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: Props) {
    if (!isOpen) return null;

    return (
        <div style={{ position:'fixed', inset:0, background:'#0008', display:'flex', alignItems:'center',
            justifyContent:'center', zIndex:1000 }}>
            <div style={{ background:'#fff', borderRadius:12, padding:32, minWidth:400 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
                    <h2 style={{ margin:0 }}>{title}</h2>
                    <button onClick={onClose}>X</button>
                </div>
                {children}
            </div>
        </div>
    );
}
