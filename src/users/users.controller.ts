import { Body, Controller, Put, Req, UseGuards ,Get} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';



interface IRequest extends Request{
  user:{
    id:string
  }
}
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(readonly userService:UsersService){}
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Body() updateUserDto: UpdateUserDto,@Req() req:IRequest) {
     const userId = req.user.id; 
    return this.userService.update(updateUserDto,userId);
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async getUser(@Req() req:IRequest) {
     const userId = req.user.id; 
    return this.userService.getUser(userId);
  }
}
