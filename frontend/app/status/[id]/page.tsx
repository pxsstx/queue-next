"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { socket } from "@/socket";

export default function StatusPage() {
  const searchParams = useParams();
  const id = searchParams.id;
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    socket.on("queue-updated", (queue: any[]) => {
      const idx = queue.findIndex((item) => item.id === id);
      setPosition(idx !== -1 ? idx + 1 : null);
      console.log(idx)
    });

    socket.on("queue-called", (calledId: string) => {
      if (calledId === id) alert("ถึงคิวของคุณแล้ว!");
    });
  }, [id]);

  return (
    <div className="p-4">
      <h1>Your Queue</h1>
      <p>{id}</p>
      {position ? (
        <p>
          คุณอยู่ลำดับที่ <strong>{position}</strong>
        </p>
      ) : (
        <p>รออัปเดต...</p>
      )}
    </div>
  );
}
