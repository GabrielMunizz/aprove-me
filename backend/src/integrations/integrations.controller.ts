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

@Controller('integrations')
export class IntegrationsController {
  constructor(
    private readonly integrationsService: IntegrationsService,
    private readonly payableService: PayableService, //injects payableService into integrations.controller
    private readonly assignorService: AssignorService, //injects assignorService into integrations.controller
  ) {}

  @Post('payable')
  createPayable(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }

  @Get('payable/:id')
  findOnePayable(@Param('id') id: string) {
    return this.payableService.findOne(+id);
  }

  @Post('assignor')
  createAssignor(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @Get('assignor/:id')
  findOneAssignor(@Param('id') id: string) {
    return this.assignorService.findOne(+id);
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
