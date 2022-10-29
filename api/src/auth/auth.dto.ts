import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthInfoDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @IsString()
  @IsNotEmpty()
  social_type: string;
}
