import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import TasksPage from './pages/TasksPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path='projects' element={<ProjectsPage />} />
          <Route path='projects/:id' element={<ProjectDetailPage/>} />
          <Route path='tasks' element={<TasksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


