# Dashboard App – Frontend

This is the frontend of my project and task dashboard. I built it with React and TypeScript, using Redux Toolkit for UI state and Apollo Client for GraphQL requests.

The frontend connects to my Node.js backend through GraphQL. Projects and tasks are stored in a PostgreSQL database.

## Features

### Dashboard Overview
- View the total number of tasks.
- See task statistics grouped by status: To Do, In Progress, and Done.
- Display statistics using reusable cards.

### Project Management
- Create projects with a name and description.
- View all projects.
- Open individual project pages to see their associated tasks.
- Delete projects.

### Task Management
- Create, edit, and delete tasks.
- Assign tasks to projects.
- Set task statuses: `TODO`, `IN_PROGRESS`, or `DONE`.
- Search tasks by title.
- Filter tasks by status.
- Validate required form fields.
- Display loading indicators and error messages during GraphQL operations.

### User Interface
- Collapsible sidebar navigation.
- Persistent sidebar preference using `localStorage`.
- Reusable modal dialogs, status badges, loading indicators, and empty states.
- CSS design tokens for consistent styling.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Building the user interface |
| TypeScript | Static typing and safer code |
| Vite 8 | Development server and production builds |
| Redux Toolkit | Managing shared UI state |
| React Redux | Connecting React components to Redux |
| Apollo Client 3 | Fetching and updating GraphQL data |
| GraphQL | Communication with the backend |
| React Router 7 | Client-side navigation |
| CSS | Component styling and design tokens |

## Getting Started

### Prerequisites

- Node.js and npm
- A running Dashboard API backend
- PostgreSQL configured for the backend

### Installation

1. Open a terminal in the `dashboard-app` directory.

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL displayed by Vite, typically:

`http://localhost:5173`

**Important:** Start the backend before using features that require GraphQL data.

## Available Scripts

- `npm run dev` – Starts the development server
- `npm run build` – Builds the app
- `npm run preview` – Previews the build
- `npm run lint` – Checks the code with ESLint

## Project Structure

```text
dashboard-app/
├── src/
│   ├── app/           # Redux store and typed hooks
│   ├── components/    # Reusable UI components
│   ├── features/      # Redux state and selectors
│   ├── graphql/       # Apollo Client, queries, mutations
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Application pages
│   ├── types/         # TypeScript types and interfaces
│   ├── App.tsx        # Routing and application setup
│   ├── main.tsx       # React application entry point
│   └── index.css      # Global styles and design tokens
├── package.json
└── README.md
```

## Architecture

I use Redux Toolkit and Apollo Client for different types of state.

### Apollo Client – Server Data

I use Apollo Client to get projects, tasks, and dashboard statistics from the backend.

- `useQuery` retrieves server data.
- `useMutation` creates, updates, or deletes data.
- Apollo's cache stores query results.
- Queries are refetched after relevant mutations to update the displayed data.

### Redux Toolkit – UI State

I use Redux Toolkit to manage shared UI state like the task search, status filter, sidebar and task modal. This data belongs to the frontend and doesn't need to be stored in the database.

## React Local State

I use useState for things that are only needed inside one component, like form inputs, validation errors and editing a task.

## localStorage

I use localStorage to remember whether the sidebar is collapsed, even after refreshing the page.

## GraphQL Backend Connection

The frontend connects to my backend using Apollo Client. The connection is set up in src/graphql/apolloClient.ts.

The backend runs at http://localhost:4000/graphql.

I use GraphQL queries to load projects, tasks and dashboard statistics. Mutations let me create and delete projects, and create, edit and delete tasks.

The backend needs to be running for the frontend to load this data.

## Error Handling and Validation

I added validation to the forms so required fields cannot be left empty. When data is loading or saving, the app shows loading states and displays an error message if something goes wrong.

## Development Notes

I built this project during a six-week full-stack course. I used it to practice React, TypeScript, Redux, and GraphQL, and to learn how a frontend works together with a backend.
