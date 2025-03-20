import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { PayableService } from 'src/payable/payable.service';
import { AssignorService } from 'src/assignor/assignor.service';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';
import { CreateAssignorDto } from 'src/assignor/dto/create-assignor.dto';
import { UpdateAssignorDto } from 'src/assignor/dto/update-assignor.dto';
import { UpdatePayableDto } from 'src/payable/dto/update-payable.dto';

@Controller('integrations')
export class IntegrationsController {
  constructor(
    private readonly integrationsService: IntegrationsService,
    private readonly payableService: PayableService,
    private readonly assignorService: AssignorService,
  ) {}

  @Post('payable')
  async createPayable(@Body() createPayableDto: CreatePayableDto) {
    const { assignorId } = createPayableDto;
    const foundAssignor = await this.assignorService.findOne(assignorId);
    if (!foundAssignor) {
      return { message: `Cedente com id ${assignorId} inexistente` };
    }
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

  @Post('assignor')
  async createAssignor(@Body() createAssignorDto: CreateAssignorDto) {
    return await this.assignorService.create(createAssignorDto);
  }

  @Get('assignor')
  async findAllAssignors() {
    return await this.assignorService.findAll();
  }

  @Get('assignor/:id')
  async findOneAssignor(@Param('id') id: string) {
    return await this.assignorService.findOne(id);
  }

  @Patch('assignor/:id')
  async updateAssignor(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    return await this.assignorService.update(id, updateAssignorDto);
  }

  @Delete('assignor/:id')
  async deleteAssignor(@Param('id') id: string) {
    return await this.assignorService.remove(id);
  }

  @Get('assignor/recover/all')
  async listDeletedAssignors() {
    return await this.assignorService.listDeletedAssignors();
  }

  @Get('assignor/recover/:id')
  async findDeletedAssignor(@Param('id') id: string) {
    return await this.assignorService.findDeletedAssignor(id);
  }

  @Patch('assignor/recover/:id')
  async recoverAssignor(@Param('id') id: string) {
    return await this.assignorService.recoverAssignor(id);
  }

  @Post()
  create(@Body() createIntegrationDto: CreateIntegrationDto) {
    return this.integrationsService.create(createIntegrationDto);
  }

  @Get()
  findAll() {
    return this.integrationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.integrationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIntegrationDto: UpdateIntegrationDto,
  ) {
    return this.integrationsService.update(+id, updateIntegrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.integrationsService.remove(+id);
  }
}
