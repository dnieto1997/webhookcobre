import { Module } from '@nestjs/common';
import { LogsCallbacksService } from './logs_callbacks.service';
import { LogsCallbacksController } from './logs_callbacks.controller';

@Module({
  controllers: [LogsCallbacksController],
  providers: [LogsCallbacksService],
})
export class LogsCallbacksModule {}
