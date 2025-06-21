import { io } from "socket.io-client";

export const socket = io("http://192.168.1.103:4000");

socket.on("connect", () => {
  console.log("Connected to backend");
});

socket.on("queue-updated", (data) => {
  console.log("Queue data:", data);
});
