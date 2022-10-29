import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UsersEntity } from 'src/entities/Users.entity';
// import { Repository } from 'typeorm';

type Profile = {
  name: string;
  email: string;
  profile_url: string;
};

@Injectable()
export class UserService {
  // constructor() {} // private usersRepository: Repository<UsersEntity>, // @InjectRepository(UsersEntity)
  // async getUser(email: string) {
  //   const user = await this.usersRepository.findOne({
  //     where: { email },
  //   });
  //   return user;
  // }
  // async createUser(profile: Profile) {
  //   await this.usersRepository.save(profile);
  // }
}
