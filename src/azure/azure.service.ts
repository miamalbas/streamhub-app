import { Injectable } from '@nestjs/common';
import { EventHubProducerClient, EventHubConsumerClient } from '@azure/event-hubs';
import { ServiceBusClient } from '@azure/service-bus';
import config from '../config/config';

@Injectable()
export class AzureService {
  eventHubProducerClient: EventHubProducerClient;
  eventHubConsumerClient: EventHubConsumerClient;
  serviceBusClient: ServiceBusClient;

  constructor() {
    this.eventHubProducerClient = new EventHubProducerClient(config.azure.eventHubConnectionString);
    this.eventHubConsumerClient = new EventHubConsumerClient(
      EventHubConsumerClient.defaultConsumerGroupName,
      config.azure.eventHubConnectionString
    );
    this.serviceBusClient = new ServiceBusClient(config.azure.serviceBusConnectionString);
  }

  getEventHubProducerClient(): EventHubProducerClient {
    return this.eventHubProducerClient;
  }

  getEventHubConsumerClient(): EventHubConsumerClient { 
    return this.eventHubConsumerClient;
  }

  getServiceBusClient(): ServiceBusClient {
    return this.serviceBusClient;
  }
}
