import { Outlet, NavLink } from 'react-router-dom';

export default function AppLayout() {
    return (
        <div style={{ display: 'flex', height: '100v'}}>
            <aside style={{ width: 220, background: '#0F172A', color: '#fff', padding: 16 }}>
                <h2 style={{ color: '#93C5F', marginBottom: 24}}>Dashboard</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 8}}>
                    <NavLink to='/'>Overview</NavLink>
                    <NavLink to='/projects'>Projects</NavLink>
                    <NavLink to='/tasks'>Tasks</NavLink>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: 24, overflowY: 'auto'}}>
                <Outlet />
            </main>
        </div>
    );
}