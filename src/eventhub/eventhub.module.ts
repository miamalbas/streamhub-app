import { Module } from '@nestjs/common';
import { AzureModule } from '../azure/azure.module';
import { EventHubController } from './eventhub.controller';
import { EventHubService } from './eventhub.service';

@Module({
  imports: [AzureModule],
  controllers: [EventHubController],
  providers: [EventHubService],
})
export class EventHubModule {}
