import { Controller, Get } from '@nestjs/common';
import { EventHubService } from './eventhub.service';

@Controller('eventhub')
export class EventHubController {
  constructor(private readonly eventHubService: EventHubService) {}

  @Get('start-listening')
  async startListening() {
    await this.eventHubService.startListening();
    return { message: 'Event Hub listening started.' };
  }
}
