import "./style.css";
import { Outlet, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleSidebar } from '../../features/uiSlice';
import { selectSidebarCollapsed } from '../../features/uiSelectors';

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector(selectSidebarCollapsed);

  return (
    <div className="app-layout">
      <aside
        className="sidebar"
        style={{
          width: collapsed ? 64 : 220,
          transition: 'width 0.2s'
        }}
      >
        <button onClick={() => dispatch(toggleSidebar())}>
          {collapsed ? '→' : '←'}
        </button>

        {!collapsed && (
            <h2 className="sidebar-title">Dashboard</h2>
        )}

        {!collapsed && (
          <nav className="sidebar-nav">
            <NavLink to="/">Overview</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
          </nav>
        )}
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
