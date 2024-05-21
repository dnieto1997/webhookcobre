import { Injectable } from '@nestjs/common';
import { CreateLogsCallbackDto } from './dto/create-logs_callback.dto';
import { UpdateLogsCallbackDto } from './dto/update-logs_callback.dto';

@Injectable()
export class LogsCallbacksService {
  create(createLogsCallbackDto: CreateLogsCallbackDto) {
    return 'This action adds a new logsCallback';
  }

  findAll() {
    return `This action returns all logsCallbacks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logsCallback`;
  }

  update(id: number, updateLogsCallbackDto: UpdateLogsCallbackDto) {
    return `This action updates a #${id} logsCallback`;
  }

  remove(id: number) {
    return `This action removes a #${id} logsCallback`;
  }
}
