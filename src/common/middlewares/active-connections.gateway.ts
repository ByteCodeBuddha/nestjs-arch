import { Server } from '@nestjs/microservices';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ActiveConnectionsGateway
  implements
    OnGatewayConnection,
    OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private activeConnections = 0;

  handleConnection() {
    this.activeConnections++;
    console.log(
      `New WebSocket connection established. Active connections: ${this.activeConnections}`,
    );
  }

  handleDisconnect() {
    this.activeConnections--;
    console.log(
      `WebSocket connection closed. Active connections: ${this.activeConnections}`,
    );
  }
}
