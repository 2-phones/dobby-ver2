import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  email: string;
  profile_url: string;
}

export class CreateTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
