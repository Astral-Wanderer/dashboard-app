import NotFoundPage from './pages/NotFoundPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import TasksPage from './pages/TasksPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { toggleSidebar } from './features/uiSlice';
import { selectSidebarCollapsed } from './features/uiSelectors';


export default function App() {
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    const collapsed = localStorage.getItem('sidebarCollapsed');

    if (collapsed === 'true') {
      dispatch(toggleSidebar());
    }
  }, [dispatch]);

  const collapsed = useAppSelector(selectSidebarCollapsed);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(collapsed));
  }, [collapsed]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path='projects' element={<ProjectsPage />} />
          <Route path='projects/:id' element={<ProjectDetailPage/>} />
          <Route path='tasks' element={<TasksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


