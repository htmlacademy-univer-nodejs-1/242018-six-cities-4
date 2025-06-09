import { IsNotEmpty, IsEmail, IsString, Length, IsOptional, Matches, IsEnum } from 'class-validator';
import { UserType } from '../../../types/user-type.enum.js';
import { CREATE_USER_MESSAGES } from './create-user.messages.js';

export class CreateUserDto {
  @IsNotEmpty({ message: CREATE_USER_MESSAGES.email.invalidFormat })
  @IsEmail({}, { message: CREATE_USER_MESSAGES.email.invalidFormat })
  public email: string;

  @IsNotEmpty({ message: CREATE_USER_MESSAGES.name.invalidFormat })
  @IsString({ message: CREATE_USER_MESSAGES.name.invalidFormat })
  @Length(1, 15, { message: CREATE_USER_MESSAGES.name.lengthField })
  public name: string;

  @IsOptional()
  @IsString({ message: CREATE_USER_MESSAGES.avatarUrl.invalidFormat })
  @Matches(/\.(jpg|png)$/i, {
    message: CREATE_USER_MESSAGES.avatarUrl.invalidExtension,
  })
  public avatar: string | null;

  @IsNotEmpty({ message: CREATE_USER_MESSAGES.password.invalidFormat })
  @IsString({ message: CREATE_USER_MESSAGES.password.invalidFormat })
  @Length(6, 12, { message: CREATE_USER_MESSAGES.password.lengthField })
  public password: string;

  @IsNotEmpty({ message: CREATE_USER_MESSAGES.type.invalidType })
  @IsEnum(UserType, { message: CREATE_USER_MESSAGES.type.invalidType })
  public type: UserType;
}
