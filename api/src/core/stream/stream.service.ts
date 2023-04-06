import { Injectable } from '@nestjs/common';
import * as Stream from 'node-rtsp-stream';
import * as fPath from '@ffmpeg-installer/ffmpeg';
@Injectable()
export class StreamService {
  streams: { [key: string]: number } = {};
  liveStream(camera: number) {
    const path = fPath.path;
    if (!((8080 + camera).toString() in this.streams)) {
      const stream = new Stream({
        name: 'Live stream',
        streamUrl:
          'rtsp://freja.hiof.no:1935/rtplive/definst/hessdalen02.stream',

        wsPort: 8080 + camera,
        ffmpegPath: path,
      });
      this.streams[(8080 + camera).toString()] = stream;
    }
    return { port: 8080 + camera };
  }
}
