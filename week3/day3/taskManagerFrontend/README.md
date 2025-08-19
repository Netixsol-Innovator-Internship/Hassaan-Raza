# Task Manager Frontend

A modern, responsive React frontend for the Task Manager API built with Vite, Tailwind CSS, and React Router.

## Features

- 🔐 **Authentication**: Login and registration with JWT tokens
- 📝 **Task Management**: Create, read, update, and delete tasks
- 🔍 **Search & Filter**: Search tasks and filter by status, priority
- 📊 **Dashboard**: Comprehensive statistics and analytics
- 📱 **Responsive Design**: Works perfectly on all devices
- 🎨 **Modern UI**: Clean, intuitive interface with Tailwind CSS
- 🔔 **Toast Notifications**: Real-time feedback for all actions
- ⚡ **Fast Performance**: Built with Vite for optimal speed

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Beautiful icons
- **Date-fns** - Date manipulation library

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- The Task Manager API running (backend)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd task-manager-frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Update the API base URL in `src/utils/api.js` if needed:
\`\`\`javascript
const API_BASE_URL = 'https://hassaan-week3-day2-api.vercel.app'
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

\`\`\`
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation bar
│   ├── ProtectedRoute.jsx # Route protection
│   └── TaskModal.jsx   # Task creation/editing modal
├── contexts/           # React contexts
│   ├── AuthContext.jsx # Authentication state
│   └── TaskContext.jsx # Task management state
├── pages/              # Page components
│   ├── Dashboard.jsx   # Dashboard with statistics
│   ├── Login.jsx       # Login page
│   ├── Profile.jsx     # User profile
│   ├── Register.jsx    # Registration page
│   └── Tasks.jsx       # Task management page
├── utils/              # Utility functions
│   └── api.js          # API configuration
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
\`\`\`

## Features Overview

### Authentication
- User registration and login
- JWT token management
- Protected routes
- Automatic token refresh

### Task Management
- Create, edit, and delete tasks
- Mark tasks as complete/incomplete
- Set priority levels (low, medium, high)
- Add due dates
- Search and filter functionality

### Dashboard
- Task statistics and analytics
- Completion rate tracking
- Priority breakdown
- Overdue task alerts
- Recent activity summary

### Responsive Design
- Mobile-first approach
- Responsive navigation
- Optimized for all screen sizes
- Touch-friendly interface

## Deployment

### Vercel (Recommended)

1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Deploy to Vercel:
\`\`\`bash
npx vercel --prod
\`\`\`

### Other Platforms

The `dist` folder contains the built application that can be deployed to any static hosting service like Netlify, GitHub Pages, or AWS S3.

## API Integration

The frontend integrates with the Task Manager API with the following endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/tasks` - Get tasks with filtering
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

## Environment Variables

No environment variables are required for basic functionality. The API URL is configured in `src/utils/api.js`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
