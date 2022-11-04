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

@Controller('api/login')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  getAll() {
    return 'Success !';
  }

  @Post()
  async login(@Body() data: AuthInfoDto): Promise<any> {
    const userProfile = await this.authService.socialLogin(data);
    return userProfile;
    // 리턴바로
  }
}
