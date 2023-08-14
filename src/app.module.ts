import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventHubService } from './eventhub/eventhub.service';
import { DatabaseModule } from './database/database.module';
import { AzureModule } from './azure/azure.module';
import { EventHubModule } from './eventhub/eventhub.module';

@Module({
  imports: [DatabaseModule, AzureModule, EventHubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly eventHubService: EventHubService) {
    this.eventHubService.initializeEventHubListeners(); 
  }
}
