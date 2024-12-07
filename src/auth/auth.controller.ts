import { Body, Controller, Post } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginDto } from 'src/dto/login-user.dto';

interface IRequest extends Request{
  user:{
    id:string;
  }
}
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {return this.authService.create(createUserDto)}
  @Post('login')
  async login(@Body() loginDto: LoginDto) {return this.authService.login(loginDto)}
   

}
