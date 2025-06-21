# Queue Management System

A real-time queue management system built with Next.js, Socket.io, and Express. This application allows users to join a queue and provides an admin interface to manage and call the next person in line.

## Features

- **Real-time Queue Management**: Live updates using Socket.io
- **User Interface**: Simple form to join the queue with name
- **Queue Status**: Real-time position tracking for users
- **Admin Dashboard**: Manage queue, call next person, clear queue
- **QR Code**: Easy access via QR code for mobile users
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Socket.io Client** - Real-time communication
- **QRCode.react** - QR code generation

### Backend
- **Express.js** - Web server
- **Socket.io** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

## Project Structure

```
queue-next/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App Router pages
│   │   ├── admin/          # Admin dashboard
│   │   ├── join/           # Join queue page
│   │   ├── status/[id]/    # Queue status page
│   │   └── page.tsx        # Home page
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
   - **Join Queue**: `http://localhost:3000/join`
   - **Admin Dashboard**: `http://localhost:3000/admin`
   - **Queue Status**: `http://localhost:3000/status/[id]` (where `[id]` is the queue ID)

## Usage

### For Users

1. Navigate to `/join`
2. Enter your name
3. Click "Join" to enter the queue
4. You'll be redirected to a status page showing your position
5. Wait for your turn - you'll get an alert when called

### For Administrators

1. Navigate to `/admin`
2. View the current queue and QR code
3. Use "เรียกคิวถัดไป" (Call Next) to call the next person
4. Use "ล้างคิวทั้งหมด" (Clear Queue) to reset the queue

## API Endpoints

### Socket.io Events

- `add-queue`: Add a new person to the queue
- `call-next`: Call the next person in queue
- `clear-queue`: Clear all queue entries
- `queue-updated`: Broadcast queue updates to all clients
- `queue-called`: Notify when a specific person is called

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