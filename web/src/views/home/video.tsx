import { JSX } from 'react';
import { GridLayout, useTracks, ControlBar, ParticipantTile, RoomAudioRenderer } from '@livekit/components-react';
import { Track } from 'livekit-client';

export const VideoConference = (): JSX.Element => {
  const tracks = useTracks([{ source: Track.Source.Camera, withPlaceholder: true }]);

  return (
    <>
      <GridLayout tracks={tracks} className="bg-base-100">
        <ParticipantTile />
      </GridLayout>
      <RoomAudioRenderer />
      <ControlBar className="bg-base-100" controls={{ screenShare: false, chat: false }} />
    </>
  );
};
