/* eslint-disable prettier/prettier */
import { IsString, Matches, MaxLength, MinLength } from "class-validator";


export class AuthCredentialsDto {
  @IsString()
  @MaxLength(20)
  @MinLength(4)
  username: string;

  @IsString()
  @MaxLength(32)
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'your password is weak try again.'})
  password: string;
}