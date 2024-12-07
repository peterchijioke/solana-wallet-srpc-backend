import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/database/entity/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthService {
   private readonly userRepository: Repository<User>;
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }
  create():string{

    const getAll = this.userRepository.find()
    return "peter"


  }
}
