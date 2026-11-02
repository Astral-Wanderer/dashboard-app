import './DashboardPage.css';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_STATS } from '../graphql/queries';
import StatCard from '../components/StatCard';

interface DashboardStats {
  totalTasks: number;
  doneTasks: number;
  inProgressTasks: number;
  todoTasks: number;
  totalProjects: number;
}

export default function DashboardPage() {
  const { loading, error, data } = useQuery<{
    dashboardStats: DashboardStats;
  }>(GET_DASHBOARD_STATS);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>
      Error loading stats: {error.message}
    </p>;
  }

  const stats = data?.dashboardStats;

  return (
    <div>
      <h1>Overview</h1>

      {/* Dashboard statistics grid */}
      <div className="stats-grid">
        <StatCard
          label="Total Tasks"
          value={stats?.totalTasks ?? 0}
        />

        <StatCard
          label="Done"
          value={stats?.doneTasks ?? 0}
          color="var(--success)"
        />

        <StatCard
          label="In Progress"
          value={stats?.inProgressTasks ?? 0}
          color="var(--warning)"
        />

        <StatCard
          label="To Do"
          value={stats?.todoTasks ?? 0}
          color="var(--text-secondary)"
        />
      </div>
    </div>
  );
}
