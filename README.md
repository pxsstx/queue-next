# Queue Management System

A real-time queue management system built with Next.js, Socket.io, and Express. This application allows users to join a queue and provides an admin interface to manage and call the next person in line.

## Features

- **Real-time Queue Management**: Live updates using Socket.io
- **User Interface**: Simple form to join the queue with name
- **Queue Status**: Real-time position tracking for users
- **Admin Dashboard**: Manage queue, call next person, clear queue
- **Authentication System**: Login/logout functionality with role-based access
- **QR Code**: Easy access via QR code for mobile users
- **Responsive Design**: Works on desktop and mobile devices
- **Service Worker**: Basic offline support and caching

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Socket.io Client** - Real-time communication
- **QRCode.react** - QR code generation
- **React Context** - Authentication state management

### Backend
- **Express.js** - Web server
- **Socket.io** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

## Project Structure

```
queue-next/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App Router pages
│   │   ├── admin/          # Admin dashboard (protected)
│   │   ├── join/           # Join queue page
│   │   ├── login/          # Login page
│   │   ├── status/[id]/    # Queue status page
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable components
│   │   └── ProtectedRoute.tsx
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx
│   ├── public/             # Static files
│   │   └── sw.js          # Service worker
│   ├── socket.ts           # Socket.io client configuration
│   └── package.json
├── backend/                 # Express.js backend server
│   ├── index.js            # Main server file
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd queue-next
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   node index.js
   ```
   The backend will run on `http://localhost:4000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

3. **Access the application**
   - **Home**: `http://localhost:3000`
   - **Join Queue**: `http://localhost:3000/join`
   - **Login**: `http://localhost:3000/login`
   - **Admin Dashboard**: `http://localhost:3000/admin` (requires login)
   - **Queue Status**: `http://localhost:3000/status/[id]` (where `[id]` is the queue ID)

## Authentication

### Demo Credentials

The application includes demo credentials for testing:

- **Admin User**:
  - Username: `admin`
  - Password: `admin123`
  - Role: Admin (can access admin dashboard)

- **Regular User**:
  - Username: `user`
  - Password: `user123`
  - Role: User (limited access)

### Authentication Features

- **Role-based Access Control**: Different permissions for admin and user roles
- **Protected Routes**: Admin dashboard requires authentication
- **Session Persistence**: Login state persists across browser sessions
- **Automatic Redirects**: Unauthorized users are redirected to login page

## Usage

### For Users

1. Navigate to `/join`
2. Enter your name
3. Click "Join" to enter the queue
4. You'll be redirected to a status page showing your position
5. Keep the page open to see real-time updates
6. You'll get an alert when it's your turn

### For Administrators

1. Navigate to `/login`
2. Enter admin credentials (admin/admin123)
3. Access the admin dashboard
4. View the current queue and QR code
5. Use "เรียกคิวถัดไป" (Call Next) to call the next person
6. Use "ล้างคิวทั้งหมด" (Clear Queue) to reset the queue
7. Use the logout button to sign out

## API Endpoints

### Socket.io Events

- `add-queue`: Add a new person to the queue
- `call-next`: Call the next person in queue
- `clear-queue`: Clear all queue entries
- `queue-updated`: Broadcast queue updates to all clients
- `queue-called`: Notify when a specific person is called

### REST API Endpoints

- `GET /health`: Health check endpoint

## Development

### Frontend Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend Scripts

```bash
node index.js    # Start the server
```

## Configuration

### Socket.io Configuration

The backend is configured to accept connections from any origin (`*`) for development. For production, you should restrict this to your specific domain.

### Port Configuration

- Backend: Port 4000
- Frontend: Port 3000

### Authentication Configuration

The current implementation uses client-side authentication for demo purposes. For production, you should:

1. Implement server-side authentication
2. Use secure session management
3. Add password hashing
4. Implement proper JWT or session-based authentication
5. Add rate limiting and security measures

## Security Notes

⚠️ **Important**: The current authentication system is for demonstration purposes only. For production use:

- Implement proper server-side authentication
- Use environment variables for sensitive data
- Add input validation and sanitization
- Implement proper error handling
- Use HTTPS in production
- Add rate limiting and security headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support or questions, please open an issue in the repository. 