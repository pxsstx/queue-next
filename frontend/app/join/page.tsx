"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/socket";

export default function JoinPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    const id = Date.now().toString();
    socket.emit("add-queue", { id, name });
    router.push(`/status/${id}`);
    console.log({id, name});
  };

  return (
    <div className="p-4">
      <h1>Join Queue</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} className=" border-sky-100 border-2 rounded-md py-1"/>
      <button onClick={handleJoin} className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
        Join
      </button>
    </div>
  );
}
