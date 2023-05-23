import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AuthDto {
  @IsNotEmpty({
    message: 'Email should not be empty',
  })
  @IsEmail(
    {},
    {
      message: 'Invalid email provided',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Password should not be empty',
  })
  @IsString({
    message: 'Password should be of type string',
  })
  password: string;
}
