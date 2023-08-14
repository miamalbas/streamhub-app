import { Injectable } from '@nestjs/common';
import { EventHubConsumerClient, earliestEventPosition } from '@azure/event-hubs';
import { EventDto } from './dto/event.dto';

@Injectable()
export class EventHubIngestionService {
  private eventHubConsumerClient: EventHubConsumerClient;

  // constructor() {
  //   // Initialize the Event Hub Consumer Client
  //   this.eventHubConsumerClient = new EventHubConsumerClient({
  //     consumerGroup: EventHubConsumerClient.defaultConsumerGroupName,
  //     connectionString: process.env.AZURE_EVENT_HUB_CONNECTION_STRING,
  //     eventHubName: '<your-event-hub-name>',
  //     startPosition: earliestEventPosition() // Start from the earliest event
  //   });
  // }

  // async startListening() {
  //   const partitionIds = await this.eventHubConsumerClient.getPartitionIds();

  //   partitionIds.forEach((partitionId) => {
  //     const receiver = this.eventHubConsumerClient.createReceiver(
  //       partitionId,
  //       earliestEventPosition() // Start from the earliest event
  //     );

  //     receiver.subscribe({
  //       processEvents: async (events, context) => {
  //         await this.processEvents(events);
  //         context.updateCheckpoint(events[events.length - 1]);
  //       },
  //       processError: async (err) => {
  //         console.error('Error occurred:', err);
  //       },
  //     });
  //   });
  // }

  private async processEvents(events: any[]) {
    for (const event of events) {
      const eventData: EventDto = event.body;
      
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
    
  }
}
