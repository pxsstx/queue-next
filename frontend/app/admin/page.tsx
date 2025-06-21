"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { QRCodeCanvas } from "qrcode.react";

export default function AdminPage() {
  const [queue, setQueue] = useState<any[]>([]);

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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <QRCodeCanvas value="http://192.168.1.103:3000/join" size={200} className="my-4" />

      <ul className="mb-4">
        {queue.map((q, i) => (
          <li key={q.id}>
            {i + 1}. {q.name}
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <button onClick={callNext} className="bg-blue-500 text-white px-4 py-2 rounded">
          เรียกคิวถัดไป
        </button>
        <button onClick={clearQueue} className="bg-red-500 text-white px-4 py-2 rounded">
          ล้างคิวทั้งหมด
        </button>
      </div>
    </div>
  );
}
