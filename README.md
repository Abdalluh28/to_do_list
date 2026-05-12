# TaskFlow

TaskFlow is a React task manager with a Kanban-style board, local-first task storage, Supabase authentication, and task syncing for signed-in users. Guests can use the board immediately, then register or log in later to move their local tasks into their account.

## Features

- Create, edit, duplicate, and delete tasks
- Organize tasks across `To Do`, `In Progress`, and `Done` columns
- Drag and drop tasks between columns
- Track task title, description, priority, status, start date, and end date
- Filter tasks by priority: `All`, `High`, `Medium`, and `Low`
- Search tasks by title with a debounced search input
- Sort tasks by `Newest`, `Oldest`, `A-Z`, or `Z-A`
- View task counts for all, completed, in-progress, and todo tasks
- Use the app as a guest with `localStorage` persistence
- Register, log in, and sync tasks with Supabase
- Merge eligible guest/local tasks into the signed-in user's task list
- Update profile name and password
- Switch between light and dark themes
- Receive toast feedback for create, edit, delete, auth, and sync actions

## Tech Stack

- React 19
- Vite 7
- React Router 7
- Redux Toolkit and RTK Query
- Supabase Auth and Supabase Database
- Tailwind CSS 4
- Material UI
- Flowbite React
- React Hook Form
- `@hello-pangea/dnd`
- Day.js and date-fns
- Lucide React icons

## Getting Started

### Prerequisites

- Node.js 20 or newer is recommended for Vite 7
- npm
- A Supabase project if you want authentication and remote task sync

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

The app reads these values in `src/services/supabase.js`.

### Development

```bash
npm run dev
```

Vite will print the local development URL in the terminal, usually `http://localhost:5173/`.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Supabase Setup

TaskFlow uses Supabase email/password authentication and two database tables: `Users` and `Tasks`.

### Authentication

Enable email/password auth in your Supabase project. During registration, the app creates a Supabase Auth user and inserts a matching row into the custom `Users` table.

### `Users` Table

Recommended columns:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Matches the Supabase Auth user id |
| `email` | `text` | User email |
| `name` | `text` | Display name |

### `Tasks` Table

Recommended columns:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `bigint` or `numeric` | Client-generated task id |
| `uniqueId` | `text` | Stable client id used for sync and conflict matching |
| `userId` | `uuid` | Authenticated user id; guest tasks use `null` locally |
| `title` | `text` | Required by the UI |
| `description` | `text` | Required by the UI |
| `priority` | `text` | `low`, `medium`, or `high` |
| `status` | `text` | `todo`, `in-progress`, or `done` |
| `startDate` | `date` | Stored as `YYYY-MM-DD` |
| `endDate` | `date` | Stored as `YYYY-MM-DD` |

Useful constraints:

- Make `uniqueId` unique per user, or globally unique if every task always has a generated UUID.
- Add foreign key behavior from `Tasks.userId` to `Users.id` if your security model allows it.
- Add row-level security policies before deploying beyond local development.

## Data Flow

- Redux stores the active task list in `state.tasks`.
- `store.subscribe` writes task changes to `localStorage` under the `tasks` key.
- Guest-created tasks are kept locally with `userId: null`.
- On registration, eligible local tasks are assigned to the new user and inserted into Supabase.
- On login, Supabase tasks and eligible local tasks are merged by `uniqueId`; local edits win when a matching task exists.
- Signed-in create, edit, delete, and drag updates are applied optimistically in Redux, then synced to Supabase.
- If a Supabase mutation fails, the relevant task change is rolled back where the hook supports it.

## Routes

| Route | Screen |
| --- | --- |
| `/` | Main task board |
| `/login` | Login form |
| `/register` | Registration form |

## Project Structure

```text
src/
  components/             Shared app UI, filters, modals, navbar, profile UI
  features/
    auth/                 Auth screens, form components, auth RTK endpoints, auth hooks
    tasks/                Task board, lists, cards, forms, task hooks, task slice
  hooks/                  Shared React hooks
  pages/                  Route-level screens
  services/               Supabase client plus task/user API wrappers
  store/                  Redux store, theme slice, RTK Query base slice
  ui/                     Small shared UI pieces
  utils/                  Task id helpers
  utlis/                  Date helper used by task cards
```

## Important Files

- `src/App.jsx` defines the app routes and toast container.
- `src/pages/Home.jsx` composes the board screen.
- `src/features/tasks/Tasks.jsx` handles filtering, sorting, and drag-and-drop status updates.
- `src/features/tasks/tasksSlice.js` stores and sorts tasks by status and date.
- `src/features/tasks/components/CreateEditTaskForm.jsx` handles task creation and editing.
- `src/features/auth/useLogin.js` merges local and Supabase tasks after login.
- `src/features/auth/useRegister.js` syncs local tasks after registration.
- `src/store/store.js` configures Redux and persists tasks to `localStorage`.
- `src/services/apiTasks.js` and `src/services/apiUser.js` wrap Supabase calls.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build the production app into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Notes for Contributors

- The app uses `localStorage` keys named `user` and `tasks`.
- Task `uniqueId` values should stay stable; they are used to merge local and remote tasks.
- Task statuses should remain `todo`, `in-progress`, and `done` because the board columns depend on those exact values.
- Task priorities should remain lowercase: `low`, `medium`, and `high`.
- The folder `src/utlis` is intentionally documented as it exists in the project, even though the name appears to be a typo.
