import { Module } from '@nestjs/common';
import { AzureModule } from '../azure/azure.module';
import { ServiceBusController } from './servicebus.controller';
import { ServiceBusService } from './servicebus.service';

@Module({
  imports: [AzureModule],
  controllers: [ServiceBusController],
  providers: [ServiceBusService],
})
export class ServiceBusModule {}
