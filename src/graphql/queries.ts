import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      createdAt
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      createdAt
      tasks {
        id
        title
        status
        createdAt
      }
    }
  }
`;

export const GET_TASKS = gql`
  query GetTasks($projectId: ID) {
    tasks(projectId: $projectId) {
      id
      title
      description
      status
      projectId
      createdAt
    }
  }
`;

export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats {
    dashboardStats {
      totalTasks
      doneTasks
      inProgressTasks
      todoTasks
      totalProjects
    }
  }
`;
