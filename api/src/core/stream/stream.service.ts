import { ForbiddenException, Injectable } from '@nestjs/common';
import * as Stream from 'node-rtsp-stream';
import * as fPath from '@ffmpeg-installer/ffmpeg';
import axios from 'axios';

@Injectable()
export class StreamService {
  private streams: { [key: number]: number } = {};
  liveStream(camera: number) {
    if (this.streams[8080 + camera]) {
      this.streams[8080 + camera]++;
      return { port: 8080 + camera };
    } else {
      const path = fPath.path;
      const stream = new Stream({
        name: 'Live stream',
        streamUrl: 'rtsp://admin:admin@192.168.0.2:554/11',

        wsPort: 8080 + camera,
        ffmpegPath: path,
      });
      this.streams[8080 + camera] = 1;
      return { port: 8080 + camera };
    }
  }

  disconnectStream(camera: number) {
    if (this.streams[8080 + camera] == 1) {
      this.streams[8080 + camera] = null;
    } else {
      this.streams[8080 + camera]--;
    }
    console.log(this.streams);
    return 'Disconnected';
  }

  async getImg() {
    const res = await axios({
      method: 'GET',
      url: 'http://192.168.0.2/tmpfs/auto.jpg',
      auth: { username: 'admin', password: 'admin' },
      responseType: 'arraybuffer',
    })
      .then((response) =>
        Buffer.from(response.data, 'binary').toString('base64'),
      )
      .catch(() => {
        throw new ForbiddenException('Camera OFF');
      });

    return res;
  }
}
