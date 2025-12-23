import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JsonwebtokenService } from './services/jsonwebtoken.service';
import { environment } from './config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: environment.JWT.SECRET,
    }),
  ],
  providers: [JsonwebtokenService],
  exports: [JsonwebtokenService],
})
export class JsonwebtokenModule {}
