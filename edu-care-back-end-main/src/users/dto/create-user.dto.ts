import { Gender, Role } from '@/users/enum/user.enum'
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  name: string

  @IsOptional()
  phoneNumber?: string

  @IsOptional()
  @IsDateString()
  birthday?: Date

  @IsOptional()
  @IsString()
  hobby?: string

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender

  @IsOptional()
  @IsString()
  avatar?: string

  @IsOptional()
  @IsEnum(Role)
  role: Role
}
