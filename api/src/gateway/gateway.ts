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
import * as chalk from 'chalk';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://192.168.0.107:3000'],
    credentials: true,
    transports: ['polling'],
  },
  allowEIO3: true,
})
export class Gateway implements OnModuleInit {
  constructor(private jwtService: JwtService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    let clientCount = 0;
    this.server.on('connection', (socket) => {
      let user;
      if (socket.handshake.headers.token) {
        let token = socket.handshake.headers.token.toString();
        user = this.jwtService.decode(decodeURIComponent(token));
        socket.join(user.loginDto.id.toString());
      } else if (socket.handshake.query.token) {
        let token = socket.handshake.query.token.toString();
        user = this.jwtService.decode(decodeURIComponent(token));
        socket.join(user.loginDto.id.toString());
      }
      clientCount++,
        console.log(
          chalk.green('Connected: '),
          socket.id,
          ' | Client count: ',
          clientCount,
        );
      socket.on('disconnecting', () => {
        clientCount--;
        console.log(
          chalk.red('Disconnected: '),
          socket.id,
          ' | Client count: ',
          clientCount,
        );
      });
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
