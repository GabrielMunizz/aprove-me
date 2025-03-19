import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';

export class CreateAssignorDto {
  @IsNotEmpty({ message: 'É necessário fornecer o número do CPF/CNPJ' })
  @IsString({ message: 'O número do CPF/CNPJ deve ser do tipo string' })
  @Length(30)
  document!: string;

  @IsNotEmpty({ message: 'É necessário fornecer o e-mail' })
  @IsString({ message: 'O e-mail deve ser do formato string' })
  @IsEmail(
    {},
    {
      message:
        'Por favor, insira um formato de e-mail válido Ex.: email@email.com.',
    },
  )
  @Length(140)
  email!: string;

  @IsNotEmpty({ message: 'É necessário fornecer o número de telefone' })
  @IsString({ message: 'O número do telefone deve ser do formato string' })
  @Length(20)
  phone!: string;

  @IsNotEmpty({ message: 'É necessário fornecer o nome do cedente' })
  @IsString({ message: 'O nome deve ser do formato string' })
  @Length(140)
  name!: string;
}
