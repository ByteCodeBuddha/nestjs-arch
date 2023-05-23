import {
  IsEmail,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
    {
      message:
        'Password must contain at least one letter, one number, and one special character',
    },
  )
  password: string;
}
