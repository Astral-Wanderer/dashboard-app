import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String!
    $status: String!
    $projectId: ID!
  ) {
    createTask(
      title: $title
      description: $description
      status: $status
      projectId: $projectId
    ) {
      id
      title
      description
      status
      projectId
      createdAt
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String!
    $description: String!
    $status: String!
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      status: $status
    ) {
      id
      title
      description
      status
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
