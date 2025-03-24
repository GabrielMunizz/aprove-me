import { IsNumber, IsUUID, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePayableDto {
  constructor(value: number, emissionDate: Date, assignorId: string) {
    this.value = value;
    this.emissionDate = emissionDate;
    this.assignorId = assignorId;
  }
  @IsNotEmpty({ message: 'É necessário fornecer o valor do recebível' })
  @IsNumber({}, { message: 'O valor do recebível deve ser um número' })
  value!: number;

  @IsNotEmpty({
    message: 'É necessário fornecer a data de emissão do recebível',
  })
  @IsDateString(
    {},
    { message: 'A data de emissão deve ser uma data válida no formato ISO.' },
  )
  emissionDate!: Date;

  @IsNotEmpty({ message: 'É necessário fornecer o ID do cedente' })
  @IsUUID('4', { message: 'O ID do cendente deve ser um UUID válido.' })
  assignorId!: string;
}
