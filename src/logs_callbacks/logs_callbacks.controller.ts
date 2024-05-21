import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogsCallbacksService } from './logs_callbacks.service';
import { CreateLogsCallbackDto } from './dto/create-logs_callback.dto';
import { UpdateLogsCallbackDto } from './dto/update-logs_callback.dto';

@Controller('logs-callbacks')
export class LogsCallbacksController {
  constructor(private readonly logsCallbacksService: LogsCallbacksService) {}

  @Post()
  create(@Body() createLogsCallbackDto: CreateLogsCallbackDto) {
    return this.logsCallbacksService.create(createLogsCallbackDto);
  }

  @Get()
  findAll() {
    return this.logsCallbacksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logsCallbacksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogsCallbackDto: UpdateLogsCallbackDto) {
    return this.logsCallbacksService.update(+id, updateLogsCallbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logsCallbacksService.remove(+id);
  }
}
