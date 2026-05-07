# AckiTask

AckiTask is a React task manager with a Kanban-style board, drag-and-drop task movement, filtering, sorting, authentication, and Supabase persistence.

## Features

- Create, edit, duplicate, delete, and complete tasks
- Drag tasks between `Todo`, `In Progress`, and `Done`
- Filter tasks by priority: `All`, `High`, `Medium`, `Low`
- Search tasks by title
- Sort tasks by newest, oldest, A-Z, or Z-A
- Local task storage for anonymous users
- Supabase auth for login and registration
- Sync local tasks to Supabase after login or registration
- Edit profile name and password
- Toast notifications for user actions

## Tech Stack

- React 19
- Vite
- Redux Toolkit and RTK Query
- Supabase
- Tailwind CSS
- Material UI
- Flowbite React
- React Hook Form
- hello-pangea/dnd
- date-fns and Day.js

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Supabase Setup

The app expects Supabase authentication to be enabled and uses two tables:

### `Users`

Stores profile data for registered users.

Recommended columns:

- `id` - UUID, matches the Supabase auth user id
- `email` - text
- `name` - text

### `Tasks`

Stores user tasks.

Recommended columns:

- `id` - numeric task id
- `uniqueId` - text, unique task identifier used for syncing
- `userId` - UUID, references the authenticated user
- `title` - text
- `priority` - text, one of `low`, `medium`, `high`
- `category` - text
- `status` - text, one of `todo`, `in-progress`, `done`
- `startDate` - date
- `endDate` - date

## Project Structure

```text
src/
  components/       Shared UI components
  features/auth/    Login, register, and auth hooks
  features/tasks/   Task board, task cards, task forms, and task hooks
  pages/            Route-level pages
  services/         Supabase client and API helpers
  store/            Redux store and RTK Query setup
  utlis/            Shared helper functions
```

## Notes

- Anonymous users can create tasks locally. After login or registration, local tasks are assigned to the user and synced to Supabase.
- The current UI is functional but ready for a design pass. The main product surface is the Kanban board, not a landing page.
