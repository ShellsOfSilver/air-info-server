import {MinLength,MaxLength, IsEmail, IsString} from "class-validator";

export interface IUser {
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
  readonly email: string;
}

export class User {

    @MinLength(2)
    @MaxLength(32)
    @IsString()
    readonly firstName: String;

    @MinLength(2)
    @MaxLength(32)
    @IsString()
    readonly lastName: String;

    @MinLength(2)
    @MaxLength(32)
    @IsString()
    readonly password: String;
    
    @IsEmail()
    readonly email: String;

    constructor(
      user: IUser = {
        firstName: "",
        lastName: "",
        password: "",
        email: ""
      }
    ) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.password = user.password;
      this.email = user.email;
    }
  }
  