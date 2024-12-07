import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users/users.controller';

@Module({
  imports: [DatabaseModule,AuthModule, UsersModule],
  controllers: [AuthController, UserController],
  providers: [AuthService,UsersService],
})
export class AppModule {}
