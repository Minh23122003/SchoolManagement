import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
          JwtModule.register({
              secret: 'secret-key',
              signOptions: {expiresIn: '1d'},
          }), UserModule,
      ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
