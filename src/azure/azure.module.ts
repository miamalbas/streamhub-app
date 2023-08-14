import { Module, OnModuleDestroy, Global } from '@nestjs/common';
import { AzureService } from './azure.service';
import config from '../config/config';
import { EventHubProducerClient } from '@azure/event-hubs';
import { ServiceBusClient } from '@azure/service-bus';

@Global()
@Module({
  providers: [AzureService],
  exports: [AzureService],
})
export class AzureModule implements OnModuleDestroy {
  private readonly eventHubProducerClient: EventHubProducerClient;
  private readonly serviceBusClient: ServiceBusClient;

  constructor(private readonly azureService: AzureService) {
    this.eventHubProducerClient = new EventHubProducerClient(config.azure.eventHubConnectionString);
    this.serviceBusClient = new ServiceBusClient(config.azure.serviceBusConnectionString);
  }

  async onModuleDestroy() {
    await this.eventHubProducerClient.close();
    await this.serviceBusClient.close();
  }
}
