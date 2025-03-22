import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(AuthGuard)
@Controller('integrations/')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Roles('admin')
  @Post('payable')
  async createPayable(@Body() createPayableDto: CreatePayableDto) {
    console.log('BODY ---> ', createPayableDto);
    return await this.payableService.create(createPayableDto);
  }

  @Roles('admin')
  @Get('payable')
  async findAllPayables() {
    return await this.payableService.findAll();
  }

  @Roles('admin')
  @Get('payable/:id')
  async findOnePayable(@Param('id') id: string) {
    return await this.payableService.findOne(id);
  }

  @Roles('admin')
  @Patch('payable/:id')
  async updatePayable(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ) {
    return await this.payableService.update(id, updatePayableDto);
  }

  @Roles('admin')
  @Delete('payable/:id')
  async deletePayable(@Param('id') id: string) {
    return await this.payableService.remove(id);
  }

  @Roles('admin')
  @Get('payable/recover/all')
  async listDeletedPayables() {
    return await this.payableService.listDeletedPayables();
  }

  @Roles('admin')
  @Get('payable/recover/:id')
  async findDeletedPayable(@Param('id') id: string) {
    return await this.payableService.findDeletedPayable(id);
  }

  @Roles('admin')
  @Patch('payable/recover/:id')
  async recoverDeletedPayable(@Param('id') id: string) {
    return await this.payableService.recoverPayable(id);
  }
}
