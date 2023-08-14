import { Injectable } from '@nestjs/common';
import { AzureService } from '../azure/azure.service';
import { EventHubConsumerClient, earliestEventPosition } from '@azure/event-hubs'; 
import { EventDto } from './dto/event.dto';
import { ServiceBusClient } from '@azure/service-bus';

@Injectable()
export class EventHubService {
  private eventHubConsumerClient: EventHubConsumerClient;
  private serviceBusClient: ServiceBusClient;

  constructor(private readonly azureService: AzureService) {
    this.eventHubConsumerClient = azureService.getEventHubConsumerClient();
    this.serviceBusClient = azureService.getServiceBusClient(); 
  }
 
  async startListening() {
    const partitionIds = await this.eventHubConsumerClient.getPartitionIds();

    for (const partitionId of partitionIds) {
      const receiver = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,

      );


      receiver.subscribe({
        processEvents: async (events) => {
          await this.processEvents(events);
        },
        processError: async (err) => {
          console.error("Error occurred: ", err);
        },
      });
    }
  }

  async initializeEventHubListeners() {
    await this.startListening();
  }

  private async processEvents(events: any[]) {
    for (const event of events) {
      const eventData = event.body;
      await this.handleEventData(eventData);
    
    }
  }

  private async handleEventData(eventData: EventDto) {

    const targetQueue = this.determineTargetQueue(eventData);

    await this.sendToServiceBusQueue(targetQueue, eventData);
  }

  private determineTargetQueue(eventData: EventDto): string {

    if (eventData.priority === 'high') {
      return 'high-priority-queue';
    } else {
      return 'default-queue';
    }
  }

  private async sendToServiceBusQueue(queueName: string, eventData: EventDto) {
    const sender = this.serviceBusClient.createSender(queueName);

    try {
      const message = {
        body: eventData,
        contentType: 'application/json',
        label: 'event-label',
      };

      await sender.sendMessages([message]);
      console.log('Message sent to Service Bus queue');
    } catch (error) {
      console.error('Error sending message to Service Bus queue:', error);
    } finally {
      await sender.close();
    }
  }


}
