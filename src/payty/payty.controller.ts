import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaytyService } from './payty.service';
import { CreatePaytyDto } from './dto/create-payty.dto';
import { UpdatePaytyDto } from './dto/update-payty.dto';

@Controller('payty')
export class PaytyController {
  constructor(private readonly paytyService: PaytyService) {}

  @Post()
  create(@Body() createPaytyDto: any) {
    return this.paytyService.create(createPaytyDto);
  }

  @Get('bank')
  findAll() {
    return this.paytyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paytyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaytyDto: UpdatePaytyDto) {
    return this.paytyService.update(+id, updatePaytyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paytyService.remove(+id);
  }
}
