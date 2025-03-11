import express, { Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import 'dotenv/config';

import { RoomConnection } from './rooms/connection.js';

const app = express();
const server = createServer(app as never);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Websocket connected');

  ws.on('error', (err) => {
    console.error(err);
  });

  ws.on('message', (data) => {
    console.log('Received', { data });
    ws.send(JSON.stringify({ hello: 'world' }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.get('/room/connection', async (_req: Request, res: Response) => {
  const connection = await new RoomConnection({ userId: 'user-123' }).build();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(connection);
});

server.listen(8080, () => {
  console.log(`Server running on port 8080`);
});
