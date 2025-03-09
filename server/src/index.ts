import express, { Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const app = express();
const server = createServer(app as never);
const wss = new WebSocketServer({ server });

type SurveyItem = {
  sequence: number;
  question: string;
  answer?: string;
};

type Payload = {
  sessionId: string;
  answer?: string;
};

wss.on('connection', (ws) => {
  console.log('Websocket connected');

  ws.on('error', (err) => {
    console.error(err);
  });

  ws.on('message', (data) => {
    const payload = JSON.parse(data as never) as Payload;
    console.log('Received', { payload });

    ws.send(JSON.stringify({ question: 'Hello' }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello from Express in Docker');
});

server.listen(8080, () => {
  console.log(`Server running on port 8080`);
});
