import { UserService } from './../service/user.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('api/user')
export class UserController {
  // constructor() {} // private userService: UserService, // private readonly authService: AuthService,
  @Get()
  sayHellp() {
    return 'hello';
  }

  // @Get(':email')
  // async getUsers(@Res() res: Response, @Param() param) {
  //   const user = await this.userService.getUser(param.email);
  //   res.json(user);
  // }

  // @Post()
  // async createUser(@Res() res: Response, @Body() body) {
  //   await this.userService.createUser(body);
  //   res.json('회원가입 완료!');
  // }
}
