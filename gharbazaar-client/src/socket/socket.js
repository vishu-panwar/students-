import { io } from "socket.io-client";

// v2 deploy test
export const socket = io("https://gharbazaar.gharbazaar.in", {
  withCredentials: true,
  autoConnect: true,
  transports: ["websocket", "polling"],
});