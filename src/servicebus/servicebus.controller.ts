import { Controller, Post, Body } from '@nestjs/common';
import { ServiceBusService } from './servicebus.service';
import { MessageDto } from './dto/message.dto';

@Controller('servicebus')
export class ServiceBusController {
    constructor(private readonly serviceBusService: ServiceBusService) {}

  @Post('/send-message')
  async sendMessage(@Body() message: MessageDto) {
    const queueName = 'your-queue-name'; 
    await this.serviceBusService.sendMessageToQueue(queueName, message);
    return { success: true, message: 'Message sent successfully' };
  }
}
