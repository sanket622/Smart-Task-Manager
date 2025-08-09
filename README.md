# Smart Task Manager Web Application

A real-time task management application built with React frontend and Express.js backend.

## Features

### User Management
- Create new users
- Mock authentication (login by email)
- View all users

### Task Management
- Create tasks with title, description, priority (Low/Medium/High), and status
- Assign tasks to users
- Set task dependencies (Task B depends on Task A)
- Update/Delete tasks
- Mark tasks as complete (only when dependencies are complete)
- View personal tasks ("My Tasks")
- View blocked tasks (tasks with incomplete dependencies)
- Filter tasks by priority and status

## Tech Stack
- **Frontend**: React with Create React App
- **Backend**: Node.js with Express.js
- **Database**: In-memory storage using JavaScript Map
- **HTTP Client**: Axios

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```
   Server will run on http://localhost:8080

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```
   App will run on http://localhost:3000

## Usage

1. **Create Users**: Start by creating users who will be assigned tasks
2. **Login**: Select a user from the dropdown to login
3. **Create Tasks**: Add new tasks with priorities, descriptions, and dependencies
4. **Manage Tasks**: Update status, assign to different users, or delete tasks
5. **View Options**: Switch between "All Tasks", "My Tasks", and "Blocked Tasks"
6. **Filter**: Use priority and status filters to find specific tasks

## API Endpoints

### Users
- `POST /api/users` - Create a new user
- `POST /api/login` - Login user
- `GET /api/users` - Get all users

### Tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/my` - Get current user's tasks
- `GET /api/tasks/blocked` - Get blocked tasks
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Key Features Implemented

✅ User creation and mock authentication  
✅ Task CRUD operations  
✅ Task priorities (Low/Medium/High)  
✅ Task statuses (To Do/In Progress/Done)  
✅ Task dependencies with validation  
✅ User assignment  
✅ Personal task view  
✅ Blocked tasks view  
✅ Priority and status filtering  
✅ Real-time updates  
✅ In-memory data storage