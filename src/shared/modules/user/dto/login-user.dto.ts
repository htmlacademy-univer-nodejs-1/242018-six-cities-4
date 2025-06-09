import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { USER_LOGIN_MESSAGES } from './login-user.messages.js';

export class LoginUserDto {
  @IsNotEmpty({ message: USER_LOGIN_MESSAGES.email.invalidFormat })
  @IsEmail({}, { message: USER_LOGIN_MESSAGES.email.invalidFormat })
  public email: string;

  @IsNotEmpty({ message: USER_LOGIN_MESSAGES.password.invalidFormat })
  @IsString({ message: USER_LOGIN_MESSAGES.password.invalidFormat })
  public password: string;
}
