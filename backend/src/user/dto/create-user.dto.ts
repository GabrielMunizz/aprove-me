import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'É necessário fornecer um login' })
  @IsString({ message: 'O login deve ser do tipo string' })
  @Length(3, 30)
  login!: string;

  @IsNotEmpty({ message: 'É necessário fornecer uma senha' })
  @IsString({ message: 'A senha deve ser do tipo string' })
  @Length(3, 30)
  password!: string;
}
