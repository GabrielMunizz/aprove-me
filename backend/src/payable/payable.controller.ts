import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Controller('integrations/')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post('payable')
  async createPayable(@Body() createPayableDto: CreatePayableDto) {
    return await this.payableService.create(createPayableDto);
  }

  @Get('payable')
  async findAllPayables() {
    return await this.payableService.findAll();
  }

  @Get('payable/:id')
  async findOnePayable(@Param('id') id: string) {
    return await this.payableService.findOne(id);
  }

  @Patch('payable/:id')
  async updatePayable(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ) {
    return await this.payableService.update(id, updatePayableDto);
  }

  @Delete('payable/:id')
  async deletePayable(@Param('id') id: string) {
    return await this.payableService.remove(id);
  }

  @Get('payable/recover/all')
  async listDeletedPayables() {
    return await this.payableService.listDeletedPayables();
  }

  @Get('payable/recover/:id')
  async findDeletedPayable(@Param('id') id: string) {
    return await this.payableService.findDeletedPayable(id);
  }

  @Patch('payable/recover/:id')
  async recoverDeletedPayable(@Param('id') id: string) {
    return await this.payableService.recoverPayable(id);
  }
}
