import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/database/entity/user.entity';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { Repository, DataSource } from 'typeorm';
import * as argon from 'argon2';


@Injectable()
export class UsersService {
 private readonly userRepository: Repository<User>;

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
  ) {
    this.userRepository = this.dataSource.getRepository(User);
  }


  async getUser(userId:string){
    try {
       const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
const {password,...rest}=user

       return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data: rest,
      };


    } 


      catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to update user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    
  }

    async update(updateUserDto: UpdateUserDto, userId: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      // Hash the new password if provided
      if (updateUserDto.password) {
        updateUserDto.password = await argon.hash(updateUserDto.password);
      }

      // Update user data
      Object.assign(user, updateUserDto);

      // Save the updated user
      const {password,...updatedUser} = await this.userRepository.save(user);

      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to update user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
