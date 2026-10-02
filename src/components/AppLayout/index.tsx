import "./style.css";
import { Outlet, NavLink } from 'react-router-dom';

export default function AppLayout() {
    return (
        <div className="app-layout">
            <aside className="sidebar">
                <h2 className="sidebar-title">Dashboard</h2>
                <nav className="sidebar-nav">
                    <NavLink to='/'>Overview</NavLink>
                    <NavLink to='/projects'>Projects</NavLink>
                    <NavLink to='/tasks'>Tasks</NavLink>
                </nav>
            </aside>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}