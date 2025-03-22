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
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(AuthGuard)
@Controller('integrations/')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Roles('admin')
  @Post('assignor')
  async createAssignor(@Body() createAssignorDto: CreateAssignorDto) {
    return await this.assignorService.create(createAssignorDto);
  }

  @Roles('admin')
  @Get('assignor')
  async findAllAssignors() {
    return await this.assignorService.findAll();
  }

  @Roles('admin')
  @Get('assignor/:id')
  async findOneAssignor(@Param('id') id: string) {
    return await this.assignorService.findOne(id);
  }

  @Roles('admin')
  @Patch('assignor/:id')
  async updateAssignor(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    return await this.assignorService.update(id, updateAssignorDto);
  }

  @Roles('admin')
  @Delete('assignor/:id')
  async deleteAssignor(@Param('id') id: string) {
    return await this.assignorService.remove(id);
  }

  @Roles('admin')
  @Get('assignor/recover/all')
  async listDeletedAssignors() {
    return await this.assignorService.listDeletedAssignors();
  }

  @Roles('admin')
  @Get('assignor/recover/:id')
  async findDeletedAssignor(@Param('id') id: string) {
    return await this.assignorService.findDeletedAssignor(id);
  }

  @Roles('admin')
  @Patch('assignor/recover/:id')
  async recoverAssignor(@Param('id') id: string) {
    return await this.assignorService.recoverAssignor(id);
  }
}
