import {
  AccessToken,
  Room,
  RoomServiceClient,
  AgentDispatchClient,
  RoomEgress,
  EncodedFileOutput,
} from 'livekit-server-sdk';
import { Env } from '../utils/env.js';
import { Logger } from '../utils/logger.js';

const logger = new Logger({ module: import.meta.url });

const AGENT_NAME = 'qualeasy';

type ConnectionDetails = {
  url: string;
  token: string;
  room: string;
  participant: { identity: string; name?: string };
};

type RoomConnectionArgs = {
  userId: string;
};

export class RoomConnection {
  private readonly args: RoomConnectionArgs;

  constructor(args: RoomConnectionArgs) {
    this.args = args;
    logger.info({ args }, 'Room Connection builder initialized');
  }

  async build(): Promise<ConnectionDetails> {
    const room = await this.createRoom();
    const at = new AccessToken(Env.lkAPIKey, Env.lkSecret, { identity: this.args.userId });
    at.addGrant({ room: room.name, roomJoin: true });
    const token = await at.toJwt();
    await this.dispatchAgent(room.name);
    return { url: Env.lkUrl, token, room: room.name, participant: { identity: this.args.userId } };
  }

  private async createRoom(): Promise<Room> {
    const roomName = `${this.args.userId}-${Math.floor(Date.now() / 1000)}`;
    const roomService = new RoomServiceClient(this.lkHost, Env.lkAPIKey, Env.lkSecret);
    const egress = this.getRoomEgress(roomName);
    const room = await roomService.createRoom({ name: roomName, emptyTimeout: 10 * 60, maxParticipants: 2, egress });
    logger.info({ room }, 'Room created');

    return room;
  }

  private getRoomEgress(roomName: string): RoomEgress {
    const output = new EncodedFileOutput({
      filepath: `/${roomName}/`,
      output: {
        case: 's3',
        value: {
          accessKey: Env.awsAccessKey,
          secret: Env.awsSecretKey,
          region: 'us-west-2',
          bucket: 'tako-beta-book-generation',
        },
      },
    });

    return new RoomEgress({ room: { fileOutputs: [output] } });
  }

  private get lkHost(): string {
    const lkUrl = new URL(Env.lkUrl);
    lkUrl.protocol = 'https';
    return lkUrl.href;
  }

  private async dispatchAgent(roomName: string): Promise<void> {
    const client = new AgentDispatchClient(this.lkHost, Env.lkAPIKey, Env.lkSecret);
    const dispatch = await client.createDispatch(roomName, AGENT_NAME);
    logger.info({ dispatch }, 'Agent dispatched to the room');
  }
}
