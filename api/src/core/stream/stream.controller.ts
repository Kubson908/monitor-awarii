import { Controller } from '@nestjs/common';
import { Param, Get } from '@nestjs/common';
import { StreamService } from './stream.service';

@Controller('stream')
export class StreamController {
    constructor(private streamService: StreamService) {}
    @Get('/live/:camera')
    streamCamera(@Param('camera') camera: number) {
        return this.streamService.liveStream(camera);
    }

    // @Get('/img')
    // async getImg() {
    //     return this.streamService.getImg();
    // }
}
