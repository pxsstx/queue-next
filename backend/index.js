const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // "*" // เปิดให้ Next.js frontend เชื่อมได้
    methods: ["GET", "POST"],
  },
});

let queue = [];

// Middleware
app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("🔌 Client connected");

  socket.emit("queue-updated", queue);

  socket.on("add-queue", (data) => {
    queue.push(data);
    io.emit("queue-updated", queue);
  });

  socket.on("call-next", () => {
    const next = queue.shift();
    io.emit("queue-updated", queue);
    
    if (next) {
      io.emit("queue-called", next.id);
    }
  });

  socket.on("clear-queue", () => {
    queue = [];
    io.emit("queue-updated", queue);
    console.log("🧹 Queue cleared");
  });

  socket.on("disconnect", () => {
    console.log("🔌 Client disconnected");
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    queueLength: queue.length,
    timestamp: new Date().toISOString()
  });
});

server.listen(4000, () => {
  console.log("✅ Socket.io backend running on http://localhost:4000");
});
