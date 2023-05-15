import { Injectable } from '@nestjs/common';
import * as Stream from '../../../node-rtsp-stream';
import * as fPath from '@ffmpeg-installer/ffmpeg';
import { InjectRepository } from '@nestjs/typeorm';
import { Stanowisko } from '../database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class StreamService {
  constructor(
    @InjectRepository(Stanowisko)
    private stanowiskoRepository: Repository<Stanowisko>,
  ) {}
  async liveStream(workplace: number) {
    let ip = (
      await this.stanowiskoRepository.findOne({
        where: { id: workplace },
        select: { kamera: true },
      })
    ).kamera;
    if (global.streams[8080 + workplace]) {
      global.streams[8080 + workplace]++;
      return { port: 8080 + workplace };
    } else {
      const path = fPath.path;
      const stream = new Stream({
        name: 'Live stream',
        streamUrl: ip,

        wsPort: 8080 + workplace,
        ffmpegPath: path,
      });
      global.streams[8080 + workplace] = 1;
      global.stream = global.streams;
      return { port: 8080 + workplace };
    }
  }
}
