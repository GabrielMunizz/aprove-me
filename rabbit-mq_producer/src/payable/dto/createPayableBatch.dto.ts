export class CreatePayableBatchDto {
  constructor(value: number, emissionDate: Date, assignorId: string) {
    this.value = value;
    this.emissionDate = emissionDate;
    this.assignorId = assignorId;
  }

  value!: number;

  emissionDate!: Date;

  assignorId!: string;
}
