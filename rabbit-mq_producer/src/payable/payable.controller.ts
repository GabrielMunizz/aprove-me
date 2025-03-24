import { Body, Controller, Get, Post } from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableBatchDto } from './dto/createPayableBatch.dto';

@Controller('integrations/')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Get('payable')
  healthCheck() {
    return { message: 'rota funcionando' };
  }

  @Post('payable/batch')
  createPayableBatch(@Body() createPayableBatchDto: CreatePayableBatchDto) {
    return this.payableService.createPayableBatch(createPayableBatchDto);
  }
}
