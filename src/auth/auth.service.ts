import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/database/entity/user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import * as argon from 'argon2';
import * as jwt from 'jsonwebtoken';
import { Config } from 'src/config';
import { LoginDto } from 'src/dto/login-user.dto';

@Injectable()
export class AuthService {
  private readonly userRepository: Repository<User>;

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
  ) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { password, ...userData } = createUserDto;

      // Hash the password
      const hashedPassword = await argon.hash(password);

      // Create the user entity
      const user = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });

      // Save the user
      const newUser = await this.userRepository.save(user);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
        data: newUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }



  async login(user: LoginDto): Promise<any> {
    try {
      const user_ = await this.userRepository.findOne({
        where: {
          email: user.email,
        },
      });

      if (!user_) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'User does not exist',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      // Verify the password
      const isPasswordValid = await argon.verify(user_.password, user.password);
      if (!isPasswordValid) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Invalid credentials',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      // Sign the JWT
      const payload = { id: user_.id };
      const accessToken = this.signJwt(payload);

      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        access_token: accessToken,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Login failed',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  signJwt(payload: { id: string }): string {
    return jwt.sign(payload, Config.JWT_SECRET_KEY, {
      expiresIn: Config.EXPIRES_IN,
    });
  }
}
