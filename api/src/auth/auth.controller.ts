import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthInfoDto } from './auth.dto';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  getAll() {
    return 'helloworld';
  }

  @Post()
  async login(@Body() data: AuthInfoDto, @Res() res: Response): Promise<any> {
    const userProfile = await this.authService.socialLogin(data);
    console.log(userProfile);
    return res.send(userProfile);
  }
}
