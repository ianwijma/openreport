import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({
    default: 'ian',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    default: 'ian@openreport.dev',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    default: '1OpenReport.Dev',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain one or more lower case character, one or more upper case characters and one or more numbers or special character',
  })
  password: string;
}
