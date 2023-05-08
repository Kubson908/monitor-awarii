import { Injectable } from '@nestjs/common';
import * as Stream from '../../../node-rtsp-stream';
import * as fPath from '@ffmpeg-installer/ffmpeg';

@Injectable()
export class StreamService {
  liveStream(camera: number) {
    if (global.streams[8080 + camera]) {
      global.streams[8080 + camera]++;
      return { port: 8080 + camera };
    } else {
      const path = fPath.path;
      const stream = new Stream({
        name: 'Live stream',
        streamUrl: 'rtsp://admin:admin@192.168.0.2:554/11',

        wsPort: 8080 + camera,
        ffmpegPath: path,
      });
      global.streams[8080 + camera] = 1;
      global.stream = global.streams;
      return { port: 8080 + camera };
    }
  }

}
