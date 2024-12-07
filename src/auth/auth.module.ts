import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { Config } from 'src/config';

@Module({
  imports:[DatabaseModule,


     JwtModule.register({
      global: true,
      secret: Config.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})


export class AuthModule {}
