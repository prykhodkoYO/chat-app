import { IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Matches(/^\+[\d\s()-]+$/, {
    message: 'Invalid phone number format',
  })
  phone: string;

  @IsString()
  @MinLength(1, { message: 'Name must be at least 1 character long' })
  name: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}