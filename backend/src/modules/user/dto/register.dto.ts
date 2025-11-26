import { IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Matches(/^\+\d{6,15}$/, {
    message: 'Invalid phone number format',
  })
  phone: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
