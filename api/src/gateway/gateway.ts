import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'net';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: 'http://localhost:3000' } })
export class Gateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('Awaria')
  onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    console.log(body);
    socket.emit('Awaria', {
      msg: 'Witam',
      content: body,
    });
  }
}
