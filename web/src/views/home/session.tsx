import { JSX, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { LiveKitRoom } from '@livekit/components-react';
import { VideoConference } from './video.js';

const WSS_URL = 'ws://localhost:8080/ws';
const REST_URL = 'localhost:8080';

type RoomConnection = {
  loading: boolean;
  error?: Error;
  data?: {
    url: string;
    token: string;
    room: string;
    participant: { identity: string; name?: string };
  };
};

export const SurveySession = (): JSX.Element => {
  const { lastJsonMessage } = useWebSocket(WSS_URL);
  const [roomConnection, setRoomConnection] = useState<RoomConnection>();

  useEffect(() => {
    if (!lastJsonMessage) return;

    console.log({ lastJsonMessage });
  }, [lastJsonMessage]);

  const onConnect = async () => {
    try {
      setRoomConnection({ loading: true });
      const response = await fetch(`http://${REST_URL}/room/connection`);
      const data = (await response.json()) as RoomConnection['data'];
      setRoomConnection({ loading: false, data });
    } catch (e) {
      setRoomConnection({ loading: false, error: e as Error });
    }
  };

  if (!roomConnection || roomConnection.loading) {
    return (
      <div>
        <button className="btn btn-primary" onClick={onConnect} disabled={roomConnection?.loading}>
          Start Session
        </button>
        {roomConnection?.loading && <span className="loading loading-spinner"></span>}
      </div>
    );
  }

  if (roomConnection.error || !roomConnection.data) {
    return (
      <div role="alert" className="alert alert-error w-full flex justify-between">
        <span className="flex-1">{roomConnection.error?.message || 'Failed to establish connection'}</span>
        <button className="btn btn-primary">Try Again</button>
      </div>
    );
  }

  return (
    <div className="h-full">
      <main data-lk-theme="default">
        <LiveKitRoom
          token={roomConnection.data.token}
          serverUrl={roomConnection.data.url}
          connect={true}
          audio={true}
          video={true}
          onMediaDeviceFailure={(error) => setRoomConnection({ error: Error(error), loading: false })}
          onDisconnected={() => setRoomConnection(undefined)}
        >
          <VideoConference />
        </LiveKitRoom>
      </main>
    </div>
  );
};
