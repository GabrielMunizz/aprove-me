import { Module } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { IntegrationsController } from './integrations.controller';
import { PayableModule } from 'src/payable/payable.module';
import { AssignorModule } from 'src/assignor/assignor.module';

@Module({
  imports: [PayableModule, AssignorModule],
  controllers: [IntegrationsController],
  providers: [IntegrationsService],
})
export class IntegrationsModule {}
