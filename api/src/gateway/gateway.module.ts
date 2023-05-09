import { Module, Global } from '@nestjs/common';
import { Gateway } from './gateway';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
    imports: [JwtModule.register({})],
    providers: [Gateway],
    exports: [Gateway]
})
export class GatewayModule {}
