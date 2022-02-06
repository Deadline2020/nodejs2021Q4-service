import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsString()
  @IsUUID(4)
  @IsOptional()
  id?: string;

  @IsString()
  name!: string;

  @IsString()
  login!: string;

  @IsString()
  password!: string;
}
