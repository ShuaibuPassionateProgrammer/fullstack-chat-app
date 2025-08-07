import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import { Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

interface UserSocketMap {
  [userId: string]: string;
}

const userSocketMap: UserSocketMap = {}; // {userId: socketId}

export function getReceiverSocketId(userId: string): string | undefined {
  return userSocketMap[userId];
}

interface SocketWithQuery extends Socket {
  handshake: Socket['handshake'] & {
    query: {
      userId?: string;
    };
  };
}

io.on('connection', (socket: SocketWithQuery) => {
  console.log('A user connected', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
    if (userId) delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { io, app, server };