import { Injectable } from '@nestjs/common';
import * as Stream from 'node-rtsp-stream';
import * as fPath from '@ffmpeg-installer/ffmpeg';
@Injectable()
export class StreamService {
  private streams: { [key: number]: Stream } = {};
  liveStream(camera: number) {
    if (this.streams[8080 + camera]) {
      if (this.streams[8080 + camera].inputStreamStarted === false) {
        this.streams[8080 + camera].startMpeg1Stream();
        this.streams[8080 + camera].pipeStreamToSocketServer();
      }
      return { port: 8080 + camera };
    } else {
      const path = fPath.path;
      const stream = new Stream({
        name: 'Live stream',
        streamUrl: 'rtsp://admin:admin@192.168.0.2:554/11',

        wsPort: 8080 + camera,
        ffmpegPath: path,
      });
      this.streams[8080 + camera] = stream;
      return { port: 8080 + camera };
    }
  }
}
