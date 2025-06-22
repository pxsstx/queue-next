"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { QRCodeCanvas } from "qrcode.react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminPage() {
  const [queue, setQueue] = useState<any[]>([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    socket.on("queue-updated", setQueue);
  }, []);

  const callNext = () => {
    socket.emit("call-next");
  };

  const clearQueue = () => {
    if (confirm("คุณต้องการล้างคิวทั้งหมดใช่ไหม?")) {
      socket.emit("clear-queue");
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.username}!
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        <QRCodeCanvas value="http://192.168.1.103:3000/join" size={200} className="my-4" />

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Current Queue</h2>
          {queue.length === 0 ? (
            <p className="text-gray-500">No one in queue</p>
          ) : (
            <ul className="space-y-1">
              {queue.map((q, i) => (
                <li key={q.id} className="p-2 text-gray-50 rounded">
                  {i + 1}. {q.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-2">
          <button 
            onClick={callNext} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={queue.length === 0}
          >
            เรียกคิวถัดไป
          </button>
          <button 
            onClick={clearQueue} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={queue.length === 0}
          >
            ล้างคิวทั้งหมด
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
