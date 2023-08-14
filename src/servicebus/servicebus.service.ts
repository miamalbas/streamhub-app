import { Injectable } from '@nestjs/common';
import { AzureService } from '../azure/azure.service';
import { ServiceBusClient } from '@azure/service-bus';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ServiceBusService {
  private serviceBusClient: ServiceBusClient;

  constructor(private readonly azureService: AzureService) {
    this.serviceBusClient = azureService.getServiceBusClient();
  }

  async sendMessageToQueue(queueName: string, message: MessageDto) {
    const sender = this.serviceBusClient.createSender(queueName);
    
    const messageToSend = {
      body: JSON.stringify(message)
    };

    try {
      await sender.sendMessages(messageToSend);
      console.log('Message sent successfully:', message);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      await sender.close();
    }
  }
}
